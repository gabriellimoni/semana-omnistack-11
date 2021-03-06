import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import './styles.css'
import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'

export default function Logon() {
    const [id, setId] = useState('')

    const history = useHistory()

    async function handleLogin(e) {
        e.preventDefault()

        try {
            const { data } = await api.post('/sessions', { id })
            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', data.name)

            history.push('/profile')
        } catch (error) {
            console.log(error)
            alert('Falha no login, tente novamente')
            setId('')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
            <img src={logoImg} alt="Logo" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size="16" color="#e02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    )
}