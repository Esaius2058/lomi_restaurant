# Contributing to the Project

Thank you for considering contributing to this project! Follow these guidelines to ensure a smooth collaboration.

---

## 📌 Project Setup
1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-org/your-repo.git
   cd your-repo
   ```
2. **Install Dependencies** (Using `pnpm` for monorepo support)
   ```sh
   pnpm install
   ```
3. **Start the Project** (Runs both frontend and backend)
   ```sh
   pnpm dev
   ```

---

## 🏷 Branching Strategy
- **`main`** – Production-ready code only.
- **`develop`** – Main working branch.
- **`feature/your-feature`** – New features or enhancements.
- **`bugfix/your-bugfix`** – Fixing issues or bugs.
- **`hotfix/critical-fix`** – Urgent fixes for production.

Before starting work, create a new branch from `develop`:
```sh
git checkout develop

git pull origin develop

git checkout -b feature/your-feature
```

---

## ✍️ Commit Message Guidelines
Follow the **Conventional Commits** format:
```
type(scope): short description
```
- **Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- **Example:**
  ```sh
  git commit -m "feat(auth): add login functionality"
  ```

---

## 📤 Pull Request Process
1. **Push your branch**:
   ```sh
   git push origin feature/your-feature
   ```
2. **Open a Pull Request (PR)**
   - Target: `develop`
   - Add a clear description.
   - Link related issues if applicable.
3. **Code Review & Approval**
   - Wait for at least **one approval** before merging.
4. **Merge using `Squash & Merge`**

---

## 📜 Code Style & Guidelines
- Follow **Prettier** and **ESLint** standards.
- Use descriptive variable and function names.
- Keep components small and reusable.
- Write meaningful comments where necessary.
- Ensure tests pass before pushing.

---

## 🛠 Reporting Issues & Feature Requests
- Open an issue in [GitHub Issues](https://github.com/your-org/your-repo/issues).
- Provide a clear title and detailed description.

---

## 🚀 Happy Coding!
Feel free to ask questions and contribute. We appreciate your help in making this project better! 🎉

