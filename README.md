## Users CRUD

Projeto web desenvolvido em `React` utilizando `Vite`.

## Acesso e Credenciais
### [Acesse a aplicação aqui!](https://users-crud.onrender.com)


```
# ADMIN
email: lucas@gmail.com
senha: 123456 
```
```
# USUARIO
email: dpinner2@virginia.edu
senha: 123456 
```
>Todas as credenciais podem ser obtidas no caminho [`/src/services/api/db.json`](https://github.com/lsferreirapel/users-crud/blob/main/src/services/api/db.json)   
A senha utilizada nessas contas é `123456` 

## Dependências
- **Design** - [`Chakra-UI`](https://chakra-ui.com/)
- **Roteamento** - [React Router dom](https://v5.reactrouter.com/web/guides/quick-start)
- **Estados** - React Context, [`js-cookie`](https://www.npmjs.com/package/js-cookie)
- **Busca de dados** - [`axios`](https://axios-http.com/ptbr/docs/intro)  e [`react-query`](https://react-query-v3.tanstack.com/) 
- **Formulários** - [`react-hook-form`](https://react-hook-form.com/) (inputs), [`yup`](https://react-hook-form.com/advanced-usage#CustomHookwithResolver) (schemas de validações)
- **API** - [`json-server`](https://www.npmjs.com/package/json-server)

## Executar
### Setup inicial
```bash
  # Clona o projeto
  git clone https://github.com/lsferreirapel/users-crud.git
```


```bash
  # Entra no diretório do projeto
  cd users-crud
```
 Crie um arquivo `.env` na pasta root do projeto e   adicione as variaveis de ambiente informadas no arquivo `.env.example`

>### Utilizando Yarn
```bash
  # Instala as dependencias do projeto
  yarn install
```

```bash
  # Inicia o json-server
  yarn server
```

```bash
  # Inicia a aplicação
  yarn dev
```



>### Utilizando npm
```bash
  # Instala as dependencias do projeto
  npm install
```

```bash
  # Inicia o json-server
  npm run server
```

```bash
  # Inicia a aplicação
  npm run dev
```



## Estrutura de pastas
```
src - ROOT                
├── atomic/          - Agrupa componentes da aplicação em uma estrutura atomic
│   ├── atoms/      
│   ├── molecules/  
│   ├── organisms/  
│   └── templates/  
│                  
├── pages/           - Agrupa páginas da aplicação
│   ├── Auth/        - Telas de autenticação, ex. Login, Registro...
│   └── Private/     - Telas privadas, ex. Home, Profile... 
│                  
├── services/        - Agrupa todos arquivos responsaveis por requisições 
│   ├── api/         - Configuração do json-server
│   ├── client/      - Configuração dos clientes HTTP (axios e react-query)
│   ├── auth/        - Agrupa arquivos responsaveis por autenticar o usuário 
│   ├── [nome da rota].ts 
│   └── ...        
│                  
├── common/         
│   ├── assets/     - Pasta responsavel por todos assets da aplicação 
│   ├── constant/   - Armazena constantes globais da aplicação
│   ├── errors/     - Armazena todas as possiveis mensagens de erro retorandas pela API
│   ├── hooks/      - Armazenar hooks globais
│   ├── theme/      - Configuração global do Chakra-UI
│   ├── types/      - Types globais do APP
│   └── utils/      - Utilitarios globais, ex. Formatação de datas, valores e conversões
│
├── App.tsx        - Arquivo responsável por configurar as rotas da aplicação
└── main.tsx    
```

## TODOs
-  Refatorar API para permitir que usuários   
   com a role USER possam editar seu próprio usuário.

-  Refatorar API para permitir que upload de imagens   

## License

This project is under the MIT license. See the file <a href="./LICENCE">LICENCE</a> for more details.

---

<p align="center">Made with 💙 by <a href="https://github.com/lsferreirapel">Lucas Ferreira</a></p>
