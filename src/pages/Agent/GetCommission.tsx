import { useCommissionDetailsQuery } from "@/redux/features/agent/agent.api";
import LoadingSpinner from "@/utils/LoadingSpinner";



export default function GetCommission() {
    const {data, isLoading} = useCommissionDetailsQuery(undefined)
if(isLoading){
    return <LoadingSpinner/>
}

   
  

    return (
        <div>
            <h1 className="text-3xl">This is GetCommission component</h1><br /><br />
            <h3>My Total Commission amount is Tk. {data?.data?.amount}</h3>
        </div>
    );
};