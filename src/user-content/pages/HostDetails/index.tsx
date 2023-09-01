import { useParams } from "react-router-dom"
import { CustomerRootModel } from "../../../models/rootModel/HostRootModel"
import './index.css'
import CloseIcon from "../../../components/CloseIcon"
import CustomerImage from "./HostImage"
import CustomerInfo from "./HostInfo"
import CustomerComments from "./HostComments"
import CustomerProducts from "./HostProducts"
import { useState, useEffect } from "react"
import WedgesLoader from "../../../components/Loaders/WedgesLoader"

const API="http://localhost:5000/root/customer"

function CustomerDetails() {
  const {customer_id} = useParams()
  const [ root, setRoot ] = useState<CustomerRootModel>()
  /*const root:CustomerRootModel = {
    comments: [
      {
        _id: "51mn50ou69ln53ou51fl47ou67ln53ou52ou54mn46ou52fl55ou49fl56fl54nt47ou98sr55nt48fl92dc97sr99sr80xt",
        commenter_full_name: "Sabri-chan goicochea",
        commenter_id: "53fl52nt99sr53ou50ou49nt53nt97sr52ou54mn47fl52fl57nt47mn54mn54nt48fl68ln55nt49nt102sr87dc89dc69ln",
        commenter_profile_pic: "https://and7sbucketdelavega.s3.us-east-2.amazonaws.com/64c7415a690592961b71facc/64d080e4e4d3fd5323f4bf25.jpeg",
        content: "commentary to a customer profile xd",
        date: "2023-07-31",
        root_id: "52ou51fl79xt47fl47ou54mn77xt46ou78xt91dc91dc55nt89dc90dc69ln98sr45mn100sr101sr91dc48fl53mn50nt50nt"
      },
      {
        _id: "51mn52nt100sr47ou53mn87dc54nt79xt100sr53mn47ou54mn51ou51mn100sr81xt49mn100sr54nt90dc81xt52mn50fl78xt",
        commenter_full_name: "Sabri-chan goicochea",
        commenter_id: "52ou51fl79xt52mn49mn46mn51ou87dc51mn57nt47fl53nt55ou47mn55ou54nt47ou68ln54fl47ou102sr77xt69ln79xt",
        commenter_profile_pic: "https://and7sbucketdelavega.s3.us-east-2.amazonaws.com/64c7415a690592961b71facc/64d080e4e4d3fd5323f4bf25.jpeg",
        content: "Probando comment con la wea xd",
        date: "2023-08-07",
        root_id: "54nt51fl99sr45mn46mn56fl97sr45mn88dc91dc101sr53ou79xt80xt89dc68ln48nt90dc71ln71ln47ou56nt48ou48ou"
      },
      {
        _id: "54nt51fl90dc50nt99sr47mn68ln53fl46mn71ln97sr54nt48mn48fl51ou51fl88dc69ln47fl51fl47ou80xt54ou54mn",
        commenter_full_name: "Sabri-chan goicochea",
        commenter_id: "51mn51fl89dc54fl51fl46mn52fl77xt53fl54mn48nt50mn57nt47mn56fl53fl48fl88dc52mn49nt102sr77xt69ln99sr",
        commenter_profile_pic: "https://and7sbucketdelavega.s3.us-east-2.amazonaws.com/64c7415a690592961b71facc/64d080e4e4d3fd5323f4bf25.jpeg",
        content: "Probando nuevo sintaxis con token en rate endpoint",
        date: "2023-08-08",
        root_id: "53fl49mn69ln48nt49nt56fl87dc45mn68ln71ln71ln52mn69ln90dc89dc68ln45mn100sr101sr101sr46mn53mn49fl50nt"
      },
      {
        _id: "51mn49mn100sr56fl69ln49nt56nt52nt52nt47ou68ln53mn87dc54fl98sr50ou68ln49fl49ou80xt56nt89dc53ou97sr",
        commenter_full_name: "Lina de la vega",
        commenter_id: "53fl52nt70ln52nt48fl47ou48ou53mn52ou82xt52mn55fl45mn67ln72ln82xt80xt46mn78xt57nt50fl100sr77xt91dc",
        commenter_profile_pic: "",
        content: "Detalles y precios xfas xd",
        date: "2023-08-13",
        root_id: "53fl51fl99sr46ou47ou55ou67ln45mn88dc71ln81xt55nt79xt90dc69ln98sr47fl90dc71ln101sr49nt54ou49fl49fl"
      },
      {
        _id: "1mn49mn100sr56fl69ln49nt56nt52nt52nt47ou68ln53mn87dc54fl98sr50ou68ln49fl49ou80xt56nt89dc53ou97sr",
        commenter_full_name: "Lina de la vega",
        commenter_id: "53fl52nt70ln52nt48fl47ou48ou53mn52ou82xt52mn55fl45mn67ln72ln82xt80xt46mn78xt57nt50fl100sr77xt91dc",
        commenter_profile_pic: "",
        content: "Detalles y precios xfas xd",
        date: "2023-08-13",
        root_id: "53fl51fl99sr46ou47ou55ou67ln45mn88dc71ln81xt55nt79xt90dc69ln98sr47fl90dc71ln101sr49nt54ou49fl49fl"
      },
      {
        _id: "mn49mn100sr56fl69ln49nt56nt52nt52nt47ou68ln53mn87dc54fl98sr50ou68ln49fl49ou80xt56nt89dc53ou97sr",
        commenter_full_name: "Lina de la vega",
        commenter_id: "53fl52nt70ln52nt48fl47ou48ou53mn52ou82xt52mn55fl45mn67ln72ln82xt80xt46mn78xt57nt50fl100sr77xt91dc",
        commenter_profile_pic: "",
        content: "Detalles y precios xfas xd",
        date: "2023-08-13",
        root_id: "53fl51fl99sr46ou47ou55ou67ln45mn88dc71ln81xt55nt79xt90dc69ln98sr47fl90dc71ln101sr49nt54ou49fl49fl"
      },
      {
        _id: "n49mn100sr56fl69ln49nt56nt52nt52nt47ou68ln53mn87dc54fl98sr50ou68ln49fl49ou80xt56nt89dc53ou97sr",
        commenter_full_name: "Lina de la vega",
        commenter_id: "53fl52nt70ln52nt48fl47ou48ou53mn52ou82xt52mn55fl45mn67ln72ln82xt80xt46mn78xt57nt50fl100sr77xt91dc",
        commenter_profile_pic: "",
        content: "Detalles y precios xfas xd",
        date: "2023-08-13",
        root_id: "53fl51fl99sr46ou47ou55ou67ln45mn88dc71ln81xt55nt79xt90dc69ln98sr47fl90dc71ln101sr49nt54ou49fl49fl"
      },
      {
        _id: "49mn100sr56fl69ln49nt56nt52nt52nt47ou68ln53mn87dc54fl98sr50ou68ln49fl49ou80xt56nt89dc53ou97sr",
        commenter_full_name: "Lina de la vega",
        commenter_id: "53fl52nt70ln52nt48fl47ou48ou53mn52ou82xt52mn55fl45mn67ln72ln82xt80xt46mn78xt57nt50fl100sr77xt91dc",
        commenter_profile_pic: "",
        content: "Detalles y precios xfas xd",
        date: "2023-08-13",
        root_id: "53fl51fl99sr46ou47ou55ou67ln45mn88dc71ln81xt55nt79xt90dc69ln98sr47fl90dc71ln101sr49nt54ou49fl49fl"
      },
      {
        _id: "9mn100sr56fl69ln49nt56nt52nt52nt47ou68ln53mn87dc54fl98sr50ou68ln49fl49ou80xt56nt89dc53ou97sr",
        commenter_full_name: "Lina de la vega",
        commenter_id: "53fl52nt70ln52nt48fl47ou48ou53mn52ou82xt52mn55fl45mn67ln72ln82xt80xt46mn78xt57nt50fl100sr77xt91dc",
        commenter_profile_pic: "",
        content: "Detalles y precios xfas xd",
        date: "2023-08-13",
        root_id: "53fl51fl99sr46ou47ou55ou67ln45mn88dc71ln81xt55nt79xt90dc69ln98sr47fl90dc71ln101sr49nt54ou49fl49fl"
      },
      {
        _id: "mn100sr56fl69ln49nt56nt52nt52nt47ou68ln53mn87dc54fl98sr50ou68ln49fl49ou80xt56nt89dc53ou97sr",
        commenter_full_name: "Lina de la vega",
        commenter_id: "53fl52nt70ln52nt48fl47ou48ou53mn52ou82xt52mn55fl45mn67ln72ln82xt80xt46mn78xt57nt50fl100sr77xt91dc",
        commenter_profile_pic: "",
        content: "Detalles y precios xfas xd",
        date: "2023-08-13",
        root_id: "53fl51fl99sr46ou47ou55ou67ln45mn88dc71ln81xt55nt79xt90dc69ln98sr47fl90dc71ln101sr49nt54ou49fl49fl"
      }
    ],
    customer: {
      _id: "52ou50ou69ln48nt47ou54mn87dc45mn98sr91dc91dc55nt89dc90dc89dc78xt48nt90dc81xt91dc49nt54ou48ou50nt",
      email: "umi_boicochea@email.com",
      full_name: "Umi-chan vargas",
      profile_pic: "https://and7sbucketdelavega.s3.us-east-2.amazonaws.com/64c019a0bee7cdcb0dee1822/64d08a08e63f2e35ac4eda47.jpg",
      stars: 0,
      contact:""
    },
    products: [
      {
        _id: "52ou52nt79xt98sr47mn57nt68ln50nt69ln90dc79xt97sr57nt47fl52ou88dc57nt71ln50ou87dc49ou70ln49ou70ln",
        able: true,
        category: "casa",
        description: "casa en venta frete a orion xd",
        imgs: [
          "https://and7sbucketdelavega.s3.us-east-2.amazonaws.com/64c019a0bee7cdcb0dee1822/64cb29b2cdca906b9e4a3d3d/64cb29b2cdca906b9e4a3d3e.png",
          "https://and7sbucketdelavega.s3.us-east-2.amazonaws.com/64c019a0bee7cdcb0dee1822/64cb29b2cdca906b9e4a3d3d/64cb29b2cdca906b9e4a3d3f.jpeg",
          "https://and7sbucketdelavega.s3.us-east-2.amazonaws.com/64c019a0bee7cdcb0dee1822/64cb29b2cdca906b9e4a3d3d/64cb29b2cdca906b9e4a3d40.jpg",
          "https://and7sbucketdelavega.s3.us-east-2.amazonaws.com/64c019a0bee7cdcb0dee1822/64cb29b2cdca906b9e4a3d3d/64cb29b2cdca906b9e4a3d41.jpeg"
        ],
        price: 150000,
        province: "cusco",
        region: "cusco",
        stars: 0,
        title: "casa en miraflores"
      },
      {
        _id: "54nt52nt100sr57nt69ln48mn102sr68ln46ou97sr54mn68ln72ln78xt53mn49fl97sr69ln52fl47fl48ou88dc50fl90dc",
        able: true,
        category: "casa",
        description: "casa en venta frete a orion xd",
        imgs: [
          "https://and7sbucketdelavega.s3.us-east-2.amazonaws.com/64c019a0bee7cdcb0dee1822/64d9c3fb0a9bfb82ac502b3d/64d9c3fb0a9bfb82ac502b3e.jfif",
          "https://and7sbucketdelavega.s3.us-east-2.amazonaws.com/64c019a0bee7cdcb0dee1822/64d9c3fb0a9bfb82ac502b3d/64d9c3fb0a9bfb82ac502b3f.jfif",
          "https://and7sbucketdelavega.s3.us-east-2.amazonaws.com/64c019a0bee7cdcb0dee1822/64d9c3fb0a9bfb82ac502b3d/64d9c3fb0a9bfb82ac502b40.jfif"
        ],
        price: 150000,
        province: "cusco",
        region: "cusco",
        stars: 0,
        title: "casa en el bosque"
      }
    ]
  }*/
  /*const [ root, setRoot ] = useState()*/
  useEffect(() => {
    fetch(API+"/"+customer_id)
    .then(res => res.json())
    .then(data => setRoot(data.root))
  },[])
  
  return (
    <>
    {root?
    <div className="CustomerPage">
    <CustomerImage customer={root.customer}/>
    {/* calificacion & contacto */}
    <CustomerInfo user={root.customer}/>
    {/* mostrar comentarios */}
    <CustomerComments comments={root.comments}/>
    {/*Products*/}
    <CustomerProducts products={root.products}/>
    <CloseIcon route="finder"/>
    </div> :
    <WedgesLoader/>}
    </>
  )
}

export default CustomerDetails