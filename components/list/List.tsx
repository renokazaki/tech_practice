import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EmergencyIcon from "../EmergencyIcon";
import StatusIcon from "../StatusIcon";
// import Dialog from "./Dialog";
import { getPostAction } from "@/lib/actions/getPostAction";

export const List = async () => {
  // サーバー側でタスクを取得
  const tasks = await getPostAction();
  console.log(tasks);
  // tasksがnullまたはundefinedの場合、空配列を使用
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const safeTasks: any[] = tasks ?? [];
  return (
    <div className="overflow-y-auto h-full w-full">
      {/* 親コンテナにスクロール設定 */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Emergency</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {safeTasks.length > 0 ? (
            safeTasks.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  <EmergencyIcon emergency={item.emergency} />
                </TableCell>
                <TableCell>
                  <StatusIcon status={item.status} />
                </TableCell>
                <TableCell colSpan={3}>{item.description}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>No tasks added</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* <Dialog
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        setTasks={setTasks}
      /> */}
    </div>
  );
};
