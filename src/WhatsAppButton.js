import React from 'react';

const WhatsAppButton = ({ phoneNumber, phoneNumberView, message }) => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    return (
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="whatsapp-button">
            {/* <button type="button"> */}
            <img src="img/WhatsApp.png" alt="WhatsApp" /> {/* Substitua pelo caminho do seu ícone */}
            {phoneNumberView}
            {/* </button> */}
        </a>
    );
};

export default WhatsAppButton;