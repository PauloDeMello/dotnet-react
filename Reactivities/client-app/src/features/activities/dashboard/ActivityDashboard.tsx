import React from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function ActivityDashboard() {
    const { activityStore } = useStore();
    const { selectedActivity, editMode } = activityStore;

    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList />
            </Grid.Column>
            <Grid.Column width="6"> {/*Total grid columns add up to 16*/}
                {selectedActivity && !editMode &&
                    <ActivityDetails />} {/*&& means that the code on the right only runs if variable on left is not null*/}
                {editMode &&
                    <ActivityForm />}
            </Grid.Column>
        </Grid>
    )
})