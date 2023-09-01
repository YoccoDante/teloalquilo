import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import SavingsIcon from '@mui/icons-material/Savings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddCardIcon from '@mui/icons-material/AddCard';
import NightShelterIcon from '@mui/icons-material/NightShelter';
import RoofingIcon from '@mui/icons-material/Roofing';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';

export interface QuestionInterface {
    question:string,
    answer:string,
    icon:any
}

export const list_of_questions:QuestionInterface[] = [
    {
        question:"Nuestros beneficios",
        answer:"Seguridad, la confianza y calidad que buscas.",
        icon:<VolunteerActivismIcon sx={{fontSize:"60px"}} color='secondary'/>
    },
    {
        question:"¿Necesito este servicio?",
        answer:"Si buscas una experiencia agradable y grata ¡Somos la opcion para ti!",
        icon:<EmojiPeopleIcon sx={{fontSize:"60px"}} color='secondary'/>
    },
    {
        question:"¿Cómo funciona?",
        answer:"Puedes contactar al arrendador, vía telefónica, o por el chat en los detalles de cada producto.",
        icon:<PsychologyAltIcon sx={{fontSize:"60px"}} color='secondary'/>
    },
    {
        question:"¿Debo pagar alguna comisión?",
        answer:"Por ninguna razón. los únicos pagos serán al momento de firmar el contrato de arrendamiento.",
        icon:<SavingsIcon sx={{fontSize:"60px"}} color='secondary'/>
    },
    {
        question:"¿Tiene garantía?",
        answer:"Por su puesto. La garantía que recibirá, es la que ofrecemos a través de la seguridad, confianza y la calidad que buscas.",
        icon:<AdminPanelSettingsIcon sx={{fontSize:"60px"}} color='secondary'/>
    },
    {
        question:"¿Costo de servicios?",
        answer:"Cada oferta detalla su precio. Sin embargo, puedes, lanzar tu oferta y llegar a un acuerdo.",
        icon:<MonetizationOnIcon sx={{fontSize:"60px"}} color='secondary'/>
    },
    {
        question:"¿Métodos de pago?",
        answer:"El pago depende del contrato que oferte el arrendador.",
        icon:<AddCardIcon sx={{fontSize:"60px"}} color='secondary'/>
    },
    {
        question:"¿Cuando se hace efectiva la adquisición del servico?",
        answer:"Puedes habitar el inmueble al cerrar trato con el arrendatario.",
        icon:<NightShelterIcon sx={{fontSize:"60px"}} color='secondary'/>
    },
    {
        question:"Servicios disponibles",
        answer:"Habitaciones, departamentos, mini departamentos, casas enteras.",
        icon:<RoofingIcon sx={{fontSize:"60px"}} color='secondary'/>
    },
    {
        question:"Cómo calificar a tu arrendador?",
        answer:"Puedes buscar a tu arrendador en la pestaña de usuarios, y calificar su perfil con estrellas.",
        icon:<Diversity1Icon sx={{fontSize:"60px"}} color='secondary'/>
    },
    {
        question:"Cómo calificar a tu inquilino?",
        answer:"También el inquilino será sujeto a una calificación de parte del arrendador, en la pestaña de inquilinos en tu adminboard",
        icon:<MilitaryTechIcon sx={{fontSize:"60px"}} color='secondary'/>
    },
    {
        question:"¿Cuál es la responsabilidad de www.teloalquilo.com?",
        answer:"Trabajo constante con nuestros socios en concientizar y sensibilizar que el servicio que oferta, debe y tiene que ser tal cual nosotros pregonamos nuestros valores: seguridad, la confianza y la calidad que buscas.",
        icon:<EscalatorWarningIcon sx={{fontSize:"60px"}} color='secondary'/>
    }
]

