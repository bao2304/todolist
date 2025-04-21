"use client";

import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo, getByIdTodos } from "@/api";

interface TaskProps {
	task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
	const router = useRouter();
	const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
	const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
	const [openModalDetail, setOpenModalDetail] = useState<boolean>(false);
	const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
	const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		await editTodo({
			id: task.id,
			text: taskToEdit,
		});
		setTaskToEdit("");
		setOpenModalEdit(false);
		router.refresh();
	};

	const handleSubmitDeleteTodo = async (id: string) => {
		await deleteTodo(id);
		setOpenModalDelete(false);
		router.refresh();
	};

	const handleClickToDetail = async (id: string) => {
		await getByIdTodos(id);
		setOpenModalDetail(false);
	};
	return (
		<tr key={task.id}>
			<td onClick={() => setOpenModalDetail(true)}>{task.text}</td>
			<td className="flex gap-5">
				<Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
					<form onSubmit={handleSubmitEditTodo}>
						<h3>Edit task</h3>
						<div className="modal-action">
							<input
								value={taskToEdit}
								onChange={(e) => setTaskToEdit(e.target.value)}
								type="text"
								placeholder="Type here"
								className="input input-bordered w-full"
							/>
							<button type="submit" className="btn">
								Submit
							</button>
						</div>
					</form>
				</Modal>
				<FiEdit
					onClick={() => setOpenModalEdit(true)}
					cursor="pointer"
					className="text-blue-500"
					size={25}
				/>
				<FiTrash2
					onClick={() => setOpenModalDelete(true)}
					cursor="pointer"
					className="text-red-500"
					size={25}
				/>
				<Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
					<h3>Delete task</h3>
					<div className="modal-action">
						<button onClick={() => handleSubmitDeleteTodo(task.id)}>
							Delete
						</button>
					</div>
				</Modal>
				<Modal modalOpen={openModalDetail} setModalOpen={setOpenModalDetail}>
					<h3> {task.text}</h3>

					{/* <div className="modal-action"></div> */}
				</Modal>
			</td>
		</tr>
	);
};

export default Task;
