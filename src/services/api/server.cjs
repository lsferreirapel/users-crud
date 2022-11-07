/* eslint-disable @typescript-eslint/no-var-requires */
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const dbFile = require("./db.json");

const server = jsonServer.create();
const router = jsonServer.router(dbFile);

server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);

const SECRET_KEY = "123456789";
const expiresIn = "1h";
const PORT = 4000;

const errors = {
  ACCESS_TOKEN_NOT_PROVIDED: "ACCESS_TOKEN_NOT_PROVIDED",
  REVOKED_ACCESS_TOKEN: "REVOKED_ACCESS_TOKEN",
  INVALID_AUTHORIZATION_FORMAT: "INVALID_AUTHORIZATION_FORMAT",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  FORBIDDEN_RESOURCE: "FORBIDDEN_RESOURCE",
  USER_NOT_FOUND: "USER_NOT_FOUND",
};

function encodePassword(password) {
  return Buffer.from(password, "utf-8").toString("base64");
}
function decodePassword(password) {
  return Buffer.from(password, "base64").toString("utf8");
}

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
  const foundUser = dbFile.users.find(
    (user) => user.email === email && decodePassword(user.password) === password
  );

  return foundUser;
}

// Login to one of the users
server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  const authenticatedUser = isAuthenticated({ email, password });

  if (!authenticatedUser) {
    const status = 401;
    const message = errors.INVALID_CREDENTIALS;
    return res.status(status).json({ status, message });
  }
  const access_token = createToken({
    id: authenticatedUser.id,
    email,
    role: authenticatedUser.role,
  });
  res.status(200).json({ access_token });
});

// Get usuar that make the request
server.get("/me", (req, res) => {
  try {
    const verifyTokenResult = verifyToken(
      req.headers.authorization.split(" ")[1]
    );

    const foundUser = dbFile.users.find(
      (user) => user.id === verifyTokenResult.id
    );

    if (!foundUser) {
      const status = 404;
      const message = errors.USER_NOT_FOUND;
      return res.status(status).json({ status, message });
    }

    return res.status(200).json(foundUser);
  } catch (error) {
    const status = 401;
    const message = errors.REVOKED_ACCESS_TOKEN;
    res.status(status).json({ status, message });
  }
});

// Middleware to validate access_token
server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = errors.INVALID_AUTHORIZATION_FORMAT;
    return res.status(status).json({ status, message });
  }
  try {
    const verifyTokenResult = verifyToken(
      req.headers.authorization.split(" ")[1]
    );

    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = errors.ACCESS_TOKEN_NOT_PROVIDED;
      return res.status(status).json({ status, message });
    }
    next();
  } catch (err) {
    const status = 401;
    const message = errors.REVOKED_ACCESS_TOKEN;
    res.status(status).json({ status, message });
  }
});

// Middleware to encode password
server.use(/\/users(\/.*)?/, (req, res, next) => {
  if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
    const password = encodePassword(req.body.password);

    if (password) {
      req.body.password = password;
    }

    next();
    return;
  }
  next();
});

// Middleware to verify user role on forbidden routes
server.use(/\/users(\/.*)?/, (req, res, next) => {
  if (req.method === "GET") {
    next();
    return;
  }

  try {
    const verifyTokenResult = verifyToken(
      req.headers.authorization.split(" ")[1]
    );

    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = errors.ACCESS_TOKEN_NOT_PROVIDED;
      return res.status(status).json({ status, message });
    }

    if (verifyTokenResult.role !== "ADMIN") {
      const status = 403;
      const message = errors.FORBIDDEN_RESOURCE;
      return res.status(status).json({ status, message });
    }

    next();
  } catch (err) {
    const status = 401;
    const message = errors.REVOKED_ACCESS_TOKEN;
    res.status(status).json({ status, message });
  }
});

server.use(router);
server.listen(PORT, () => {
  console.log(`API Running on port ${PORT}`);
});
