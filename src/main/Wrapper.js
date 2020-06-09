import React, { useContext } from 'react';
import Header from './Shared/Header/Header';
import Footer from './Shared/Footer/Footer';
import ContainerNav from './ContainerNav';
import { EventContext } from '../context/EventContextProvider';
import DataContextProvider from '../context/DataContextProvider';
import PageLoader from './Shared/Loader/PageLoader';

const Wrapper = () => {
    const { isLoader } = useContext(EventContext);
    return(
        <DataContextProvider>
            <Header />
            <section id="container">
                <ContainerNav />
            </section>
            <Footer />
            {isLoader && <PageLoader />}
        </DataContextProvider>
    )
}

export default Wrapper;