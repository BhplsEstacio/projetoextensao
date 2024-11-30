import { CategoryRequestDTO } from "../category/categoryrequestdto";

type TaskWithCategoriesAbstractDTO = {
    categories?: CategoryRequestDTO[] | null
}

export default TaskWithCategoriesAbstractDTO;