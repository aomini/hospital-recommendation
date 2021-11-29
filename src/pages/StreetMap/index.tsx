import React from 'react'
import axios from "src/utils/axios"
import StreetMap from 'src/components/StreetMap'
import { StreetMapProps } from 'src/types/StreetMapTypes';

const StreetMapPage: React.FC = () => {
  const [hospitals, setHospitals] = React.useState<StreetMapProps['hospitals']>([])
  
  React.useEffect(() => {
    axios.get("hospitals/basic").then((resp: unknown) => {
      setHospitals(resp as StreetMapProps['hospitals'])
    });
  }, [])

  return <div className="">    
    <StreetMap hospitals={hospitals}/>
  </div>
};
export default StreetMapPage;
