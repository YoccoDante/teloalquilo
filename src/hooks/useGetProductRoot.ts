import { BACKEND_TOOLS } from "../models/BACKEND_TOOLS"


async function useGetProductRoot( product_id:string ) {
  const API = BACKEND_TOOLS.API_URI+'/root/product/'+product_id
    try {
      const res = await fetch(API, {
        headers: {
          'Enterprise-Id': BACKEND_TOOLS.ENTERPRISE_ID
        }
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      const root = data.root;
      return root;
    } catch (error) {
      throw new Error(`¡Ha ocurrido un error, inténtalo más tarde!`);
    }
}

export default useGetProductRoot