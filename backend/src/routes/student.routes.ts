
import { Router } from "express";
import { upload } from "../middleware/upload";
import {
  list,
  getOne,
  create,
  update,
  remove,
} from "../controllers/student.controller";

const router = Router();

router.get("/", list);
router.get("/:id", getOne);
router.post("/", upload.single("photo"), create);
router.put("/:id", upload.single("photo"), update);
router.delete("/:id", remove);

export default router;
