import { ITask } from "@/types/tasks";
import React from "react";
import Task from "./Task";
interface TodoListProps {
	tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
	return (
		<div>
			<div className="overflow-x-auto">
				<table className="table w-full">
					{/* head*/}
					<thead>
						<tr>
							<th>Name</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{tasks.map((task) => (
							<Task key={task.id} task={task} />
						))}
						{/* row 1 */}
					</tbody>
				</table>
			</div>
		</div>
	);
};
export default TodoList;
