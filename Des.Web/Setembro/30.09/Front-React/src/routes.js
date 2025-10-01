// React Router
import { createBrowserRouter, Navigate } from "react-router-dom"
import Login from './pages/login'
import Error from './pages/error'
import Home from './pages/home'

// Cursos
import Cursos from './pages/cursos'
import CursosCreate from './pages/cursos/create'
import CursosEdit from './pages/cursos/edit'

// Disciplinas
import Disciplinas from './pages/disciplinas'
import DisciplinasCreate from './pages/disciplinas/create'
import DisciplinasEdit from './pages/disciplinas/edit'

// Alunos
import Alunos from './pages/alunos'
import AlunosCreate from './pages/alunos/create'
import AlunosEdit from './pages/alunos/edit'

// Matrículas
import Matriculas from './pages/matriculas'
import MatriculasCreate from './pages/matriculas/create'
import MatriculasEdit from './pages/matriculas/edit'

const router = createBrowserRouter([
    { 
        path: "/", 
        element: <Navigate to="/login" replace />
    },
    {
        path: "/login", 
        element: <Login />,
    },
    {
        path: "/error", 
        element: <Error />,
    },
    { 
        path: "/home", 
        element: <Home />,
    },

    // Cursos
    {
        path: "/cursos", 
        element: <Cursos />,
    },
    {
        path: "/cursos/create", 
        element: <CursosCreate />,
    },
    {
        path: "/cursos/edit", 
        element: <CursosEdit />,
    },

    // Disciplinas
    {
        path: "/disciplinas", 
        element: <Disciplinas />,
    },
    {
        path: "/disciplinas/create", 
        element: <DisciplinasCreate />,
    },
    {
        path: "/disciplinas/edit", 
        element: <DisciplinasEdit />,
    },

    // Alunos
    {
        path: "/alunos", 
        element: <Alunos />,
    },
    {
        path: "/alunos/create", 
        element: <AlunosCreate />,
    },
    {
        path: "/alunos/edit", 
        element: <AlunosEdit />,
    },

    // Matrículas
    {
        path: "/matriculas", 
        element: <Matriculas />,
    },
    {
        path: "/matriculas/create", 
        element: <MatriculasCreate />,
    },
    {
        path: "/matriculas/edit", 
        element: <MatriculasEdit />,
    },
])

export default router