﻿using news._01_Domain.Models_Entities_.Media;
using news._02_Application.Dto.LoadMoreNewsResult;

namespace news._02_Application.Interfaces
{
    public interface IMediaService
    {
        Task<List<Media>> GetAll();
        Task<LazyLoadResponse<GalleryDto>> GetGallery(int skip,int take);
        Task<Media?> GetById(int id);
        Task<Media?> Update(Media media);
        Task<bool> Delete(int id);
    }
}
