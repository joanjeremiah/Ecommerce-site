import UserModel from '../Models/User';
import Model from '../Models/User';

const Home =() => {
    return(<div>Hello</div>)
}

export const getServerSideProps = async () => {
    UserModel.deleteMany({})
    .then(docs => console.log(docs))
    return {
        props: {
            
        }
    }
}

export default Home;
