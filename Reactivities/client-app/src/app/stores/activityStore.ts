import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";
import { act } from "react";

export default class ActivityStore {
    activityMap = new Map<string, Activity>()
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this);
    }

    get activitiesByDate() {
        return Array.from(this.activityMap.values()).sort((a, b) =>
            Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities = async () => {
        try {
            //Get activites from API
            const activities = await agent.Activities.list();
            //For each activity from API we rewrite the date, and add to our observable activities member
            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];
                this.activityMap.set(activity.id, activity)
            })
            this.setLoadingIntitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingIntitial(false);
        }
    }

    setLoadingIntitial = (state: boolean) => {
        //This method (action) is required because we cannot set the observable without using a specific action for it.
        this.loadingInitial = state;
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activityMap.get(id);
    }

    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();

        try {
            await agent.Activities.create(activity);
            //Again when modifying observables we must use a specific action.
            runInAction(() => {
                this.activityMap.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;

        try {
            await agent.Activities.update(activity);
            //Again when modifying observables we must use a specific action.
            runInAction(() => {
                this.activityMap.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;

        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityMap.delete(id);
                if (this.selectedActivity?.id == id) {
                    this.cancelSelectedActivity();
                }
                this.loading = false;
            })

        }
        catch (error) {
            console.log(error);
            this.loading = false;
        }
    }

}