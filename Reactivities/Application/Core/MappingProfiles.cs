using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            //In use, maps request.acitivity (request obj pulled from body) to activity (db entity)
            //Runs activity.Title = request.Activity.Title ?? activity.Title; activity.Date = request.Activity.Date ?? activity.Date; etc... for all values in entity.
            CreateMap<Activity, Activity>();
        }
    }
}