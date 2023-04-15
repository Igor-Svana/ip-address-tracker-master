import './infoBox.css';

interface IInfoBox {
    label: string;
    info?: string;
    country?: string
}

const InfoBox = ({label, info, country}:IInfoBox) => {
    return(
        <div className='ip-info-container'>
            <span>{label}</span>
            <p style={{color:"var(--very-dark-grey)"}}>{info ? info : ""}</p>
            <p style={{color:"var(--very-dark-grey)"}}>{country ? country : ""}</p>
        </div>
    )
}

export default InfoBox;