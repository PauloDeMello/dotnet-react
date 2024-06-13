import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface Props {
    activities: Activity[];
}

export default function ActivityDashboard({ activities }: Props) { /* { activities }: Props destructures prop: Props, so we no longer need prop.activities*/
    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList activities={activities} />
            </Grid.Column>
            <Grid.Column width="6"> {/*Total grid columns add up to 16*/}
                {activities[0] &&
                    <ActivityDetails activity={activities[0]} />} {/*&& means that the code on the right only runs if variable on left is not null*/}
                <ActivityForm />
            </Grid.Column>
        </Grid>
    )
}