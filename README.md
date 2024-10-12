# **Instructions Related to the Project**
---
### 01. Create Next Project
> - `npx create-next-app`

> project named? . <br>
> TypeScript? Yes <br>
> ESSLint? No/Yes <br>
> Tailwind CSS? Yes <br>
> src/ directory? No <br>
> App Router? Yes <br>
> import alias? No <br>
> Run Project in Development mod

> - `npm run dev`

<!-- --------------------------------------------------- -->
### **02. Connect local repository to gihub**
> Check local config
> - git config --list

> Unset local user and email
> - git config --unset user.name
> - git config --unset user.email

> Set local configuration
> - git config user.name "new_user_name"
> - git config user.email "abc@gmail.com"

> Rename the master branch to main branch
> - git branch -M main

> Add remote repo with local repo
> - git remote add origin https://github.com/AongCho880/issue-tracker-app-NextJS.git

> Push to github
> - git add .
> - git commit -m "first commit"
> - git push -u origin main

<!-- --------------------- -->
### **02. React Icons**
> [React Icons...](https://react-icons.github.io/react-icons/)
> - `npm install react-icons`

<!-- ------------------ -->
### **03. Prisma Set-Up**
> - `npm i prisma`
> - `npx prisma init` <br>
> This will create a `prisma` dir and `.env` file <br>
> In `prsma/schema.prisma` change the `provider = "mysql"` in `datasource db` section. <br>
> Create required tables in `schema.prisma`
> - `npx prisma format` <br>
> - `npx prisma migrate dev`


<!-- Buil an API -->
### **04. Build and API**
> Create `app/api/issues/route.ts`<br>
> Install `Zod` for data validation
> - `npm i zod`<br>
> Create PrismaClient `prisma/client.ts` <br>
> Copy code form [here](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices) `db.ts` and past to `client.ts`

