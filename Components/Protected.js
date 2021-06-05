import Link from "next/link"
import {signIn} from 'next-auth/client'

const Protected = () => {
    
    return(
        <div className="protected">
            You need to sign in before you can access this page.You can <Link href=""><a onClick={() => signIn()}>&nbsp;Sign In&nbsp;</a></Link> here.
        </div>
    );
}

export default Protected;