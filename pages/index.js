import Head from 'next/head';
import {MongoClient} from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

const HomePage = props => {

    return (
    <>
        <Head>
            <title>React Meetups</title>
        </Head>
        <MeetupList meetups={props.meetups} />
    </>
    )
};

export const getStaticProps = async () => {
    // send a HTTP request.
    const client = await MongoClient.connect('mongodb+srv://KengoHirata:PTcTGPswWlpH8jLv@cluster0.lusd3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
    const collection = client.db().collection('meetups');
    const loadedMeetups = await collection.find().toArray();
    client.close();
    return {
        props: {
            meetups: loadedMeetups.map(meetup => ({
                id: meetup._id.toString(),
                title: meetup.title,
                image: meetup.image,
                description: meetup.description
            }))
        },
        revalidate: 3600
    };
};

export default HomePage;