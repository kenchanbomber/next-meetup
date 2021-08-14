import { Fragment } from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
    const router = useRouter()
    const addMeetupHandler = async (meetupData) => {
        await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(meetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        router.push('/');
    };
    return (
        <Fragment>
            <Head>
                <title>New Meetup</title>
                <meta title="description" description="Add new Meetup!!!" />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </Fragment>
    );
};

export default NewMeetupPage;