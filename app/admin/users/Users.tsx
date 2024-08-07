"use client";

import { User } from "@/lib/models/UserModel";
import { formatId } from "@/lib/utils";
import Link from "next/link";
import toast from "react-hot-toast";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Loading from "@/components/dashboardfeatures/loading/loading";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

export default function Users() {
  const { data: users, error } = useSWR(`/api/admin/users`);
  const { trigger: deleteUser } = useSWRMutation(
    `/api/admin/users`,
    async (url, { arg }: { arg: { userId: string } }) => {
      const toastId = toast.loading("Deleting user...");
      const res = await fetch(`${url}/${arg.userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      res.ok
        ? toast.success("User deleted successfully", {
            id: toastId,
          })
        : toast.error(data.message, {
            id: toastId,
          });
    }
  );
  if (error) return "An error has occurred.";
  if (!users) return <Loading />;

  return (
    <div>
      <h1 className="py-4 text-2xl">Users</h1>

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="uppercase bg-[#292929] text-white">
            <tr>
              <th>id</th>
              <th>name</th>
              <th>email</th>
              <th>admin</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user._id}>
                <td>{formatId(user._id)}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td
                  className={user.isAdmin ? "text-green-500 font-bold" : "text-red-500 font-bold"}
                >
                  {user.isAdmin ? (
                    <MdAdminPanelSettings className="inline mr-2 mb-1" />
                  ) : (
                    <FaRegUser className="inline mr-2 mb-1" />
                  )}
                  {user.isAdmin ? "YES" : "NO"}
                </td>

                <td>
                  <Link
                    href={`/admin/users/${user._id}`}
                    type="button"
                    className="btn btn-ghost bg-gray-500 rounded-xl btn-sm"
                  >
                    <FaEdit />
                  </Link>
                  &nbsp;
                  <button
                    onClick={() => deleteUser({ userId: user._id })}
                    type="button"
                    className="btn btn-ghost bg-red-600 rounded-xl btn-sm"
                    aria-label={`Delete user ${user.name}`}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
