import './WelcomeComp.css';

function WelcomeComp({nombreUsuario}) {
    return (
        <div className='bienvenida'>
            Bienvenida/o {nombreUsuario}
        </div>
      );
}

export default WelcomeComp;

