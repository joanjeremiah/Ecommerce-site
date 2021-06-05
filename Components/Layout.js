import Link from 'next/link';
import {useSession,signIn,signOut} from 'next-auth/client';
import { useRef,useState } from 'react';
import {useRouter} from 'next/router';
 
const Layout = ({children}) => {
    const [session,loading] = useSession();
    const [searchInput,setSearchInput] = useState('');
    const router = useRouter();
    const profileBox = useRef(null)
    const onImageClick = (e) => {
        console.log(e.target.getBoundingClientRect())
        const top = e.target.getBoundingClientRect().bottom + 10 + 'px';
        const left = e.target.getBoundingClientRect().left - 10 + 'px';
        profileBox.current.style.top = top;
        profileBox.current.style.left = left;
        profileBox.current.classList.toggle('profile-box-block')
    }
    const onSearchFormSubmit = async (e) => {
        e.preventDefault();
        // const response = await fetch('/api/search',{
        //     method: 'POST',
        //     body: JSON.stringify({term: searchInput})
        // })
        router.push({
            pathname: `/search`,
            query: {t:searchInput}
        })
    }
    const onSearchInputChange = (e) => {
        setSearchInput(e.target.value)
    }
    return(
        <div>
            <nav>
                <Link href="/">
                    <h1>E Commerce</h1>
                </Link>
                
                <ul>
                    <li>
                        <form onSubmit={onSearchFormSubmit}>
                            <input value={searchInput} onChange={onSearchInputChange} type="text" placeholder="Search for products.." />
                            <input type="submit" value="&#128269;" />
                        </form>     
                    </li>
                    {!session && <li><a onClick={() => signIn()}>Sign in</a> or <Link href="/signup"><a>Create an account</a></Link></li>}
                    {session && <li>
                            <div className="profile"  onClick={onImageClick}>
                                <img src={session.user.image} alt="profile" />
                                {session && session.user && <span>{session.user.name} &#9661;</span>}
                            </div>
                        </li>}
                    <li><Link href="/cart"><a>Cart</a></Link></li>
                </ul>
            </nav>
            <div className="profile-box" ref={profileBox}>
                <p>Profile</p>
                <p onClick={() => signOut()}>Sign out</p>
            </div>
            <div className="sections">
                <Link href="/">
                    <a>Home</a>
                </Link>
                <Link href="">
                    <a>Best sellers</a>
                </Link>
                <Link href="">
                    <a>Clothes</a>
                </Link>
                <Link href="">
                    <a>Electronics</a>
                </Link>
                <Link href="">
                    <a>Shoes</a>
                </Link>
                <Link href="">
                    <a>Jewelry</a>
                </Link>
                <Link href="">
                    <a>Customer service</a>
                </Link>
            </div>
            {children}
        </div>
    );
}

export default Layout;