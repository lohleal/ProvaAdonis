// React Router
import { createBrowserRouter, Navigate } from "react-router-dom"
import Login from './pages/login'
import Error from './pages/error'
import Home from './pages/home'

// Clientes
import Clientes from './pages/clientes'
import ClientesCreate from './pages/cliente/create'
import ClientesEdit from './pages/cliente/edit'

// Contas Correntes
import ContasCorrentes from './pages/contaCorrente'
import ContasCorrentesCreate from './pages/contaCorrente/create'
import ContasCorrentesEdit from './pages/contaCorrente/edit'

// Movimentações
import Movimentacoes from './pages/movimentacoes'
import MovimentacoesCreate from './pages/movimentacao/create'
import MovimentacoesEdit from './pages/movimentacao/edit'

// Aplicações Financeiras
import AplicacoesFinanceiras from './pages/aplicacoesFinanceiras'
import AplicacoesFinanceirasCreate from './pages/aplicacoesFinanceiras/create'
import AplicacoesFinanceirasEdit from './pages/aplicacoesFinanceiras/edit'

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

    // Clientes
    {
        path: "/clientes", 
        element: <Clientes />,
    },
    {
        path: "/clientes/create", 
        element: <ClientesCreate />,
    },
    {
        path: "/clientes/edit", 
        element: <ClientesEdit />,
    },

    // Contas Correntes
    {
        path: "/contas-correntes", 
        element: <ContasCorrentes />,
    },
    {
        path: "/contas-correntes/create", 
        element: <ContasCorrentesCreate />,
    },
    {
        path: "/contas-correntes/edit", 
        element: <ContasCorrentesEdit />,
    },

    // Movimentações
    {
        path: "/movimentacoes", 
        element: <Movimentacoes />,
    },
    {
        path: "/movimentacoes/create", 
        element: <MovimentacoesCreate />,
    },
    {
        path: "/movimentacoes/edit", 
        element: <MovimentacoesEdit />,
    },

    // Aplicações Financeiras
    {
        path: "/aplicacoes-financeiras", 
        element: <AplicacoesFinanceiras />,
    },
    {
        path: "/aplicacoes-financeiras/create", 
        element: <AplicacoesFinanceirasCreate />,
    },
    {
        path: "/aplicacoes-financeiras/edit", 
        element: <AplicacoesFinanceirasEdit />,
    },
])

export default router