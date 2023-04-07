import instance from "./instance";

export const getAllCate = () => {
    return instance.get("/categories");
};
