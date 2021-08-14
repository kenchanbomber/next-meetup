import Head from 'next/head';
import {MongoClient, ObjectId} from 'mongodb';

import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetailPage = props => {
    const {title, image, address, description} = props.meetup;
    return (
    <>
        <Head>
            <title>{title}</title>
            <meta title="description" content={description} />
        </Head>
        <MeetupDetail title={title} image={image} address={address} description={description}/>
    </>
    );
};

export const getStaticPaths = async () => {
    const client = await MongoClient.connect('mongodb+srv://KengoHirata:PTcTGPswWlpH8jLv@cluster0.lusd3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
    const collection = client.db().collection('meetups');
    const loadedMeetups = await collection.find({}, { _id: 1 }).toArray();
    client.close();
    return {
        fallback: true,
        paths: loadedMeetups.map(meetup => ({params: {meetupId: meetup._id.toString()}}))
    };
};

export const getStaticProps = async (context) => {
    // send a HTTP request...
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect('mongodb+srv://KengoHirata:PTcTGPswWlpH8jLv@cluster0.lusd3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
    const collection = client.db().collection('meetups');
    const selectedMeetup = await collection.findOne({_id: ObjectId(meetupId)});
    client.close();
    return {
        props: {
            meetup: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                address: selectedMeetup.address,
                description: selectedMeetup.description
            }
        },
        revalidate: 1
    };
};

export default MeetupDetailPage;
