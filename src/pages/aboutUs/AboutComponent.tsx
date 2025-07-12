import EmailLink from "@/components/emailLink/EmailLink";

function AboutComponent() {
    return (
        <div className="about-component w-full min-h-screen flex flex-col flex-1 p-4 md:text-left">
            <h1>Sobre nós</h1>
            <p>Somos uma equipe dedicada a fornecer as melhores soluções para suas necessidades.</p>
            <p>Nossa missão é inovar e entregar produtos de alta qualidade.</p>
            <p>Nosso gerador de NF-e foi criado para facilitar a vida do pequeno empreendedor, sem burocracia.</p>
            <p>Entre em contato conosco pelo e-mail: <EmailLink emailAddress="juniorceia1996@gmail.com" subject="Contato via site" body="Olá Junior, vi seu site e gostaria de..." /></p>
        </div>
    );
}

export default AboutComponent;