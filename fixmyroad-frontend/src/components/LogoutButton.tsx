import { removeToken } from "@/lib/auth";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function LogoutButton(){
    const router = useRouter();
    const handleLogout = ()=>{
        removeToken();
        router.push("/login");
    };

    return(
        <Button onClick={handleLogout} variant="destructive">
            Logout
        </Button>
    )
}