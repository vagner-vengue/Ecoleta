import React from 'react';

// Interface TypeScript que torna os parâmetros obrigatórios
interface HeaderProps {
    title: string;
}

// Poderia ser somente "function Header() {" , mas o React.FC facilita a manutenção e evita erros. 
const Header: React.FC<HeaderProps> = (props) => {
    return(
        <header>
            <h1>{ props.title }</h1>
        </header>
    );
}

export default Header;
