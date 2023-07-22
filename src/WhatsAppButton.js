import React from 'react';

const WhatsAppButton = ({ phoneNumber, message }) => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="whatsapp-button">
            {/* <button type="button"> */}
            <img src="assets/img/WhatsApp.png" alt="WhatsApp" /> {/* Substitua pelo caminho do seu ícone */}
            {phoneNumber}
            {/* </button> */}
        </a>
    );
};

export default WhatsAppButton;