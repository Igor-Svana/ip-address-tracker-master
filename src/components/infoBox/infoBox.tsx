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
            <h1 style={{color:"var(--very-dark-grey)"}}>{info ? info : ""}</h1>
            <h1 style={{color:"var(--very-dark-grey)"}}>{country ? country : ""}</h1>
        </div>
    )
}

export default InfoBox;