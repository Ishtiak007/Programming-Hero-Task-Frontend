"use client";

import * as React from "react";
import { FaTrash } from "react-icons/fa";
import { ChevronDown, EditIcon } from "lucide-react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "../../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { Input } from "../../../ui/input";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { TEvent } from "../../../../types/event";
import {
  deleteProductById,
  updateProductStatusById,
} from "../../../../services/EventApi";

export default function ManageUserAddedEvents({
  events,
}: {
  events: TEvent[];
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [eventToDelete, setEventToDelete] = React.useState<string | null>(null);

  const handleDeleteEvent = async (id: string) => {
    try {
      const response = await deleteProductById(id);
      if (response?.success) {
        toast.success("Event deleted successfully by you");
        closeModal();
      } else {
        toast.error(response.error[0]?.message);
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const handleUpdateEventStatus = async (id: string, status: string) => {
    try {
      const response = await updateProductStatusById(id, { status });
      if (response?.success) {
        toast.success("Event status updated successfully by you");
      } else {
        toast.error(response.error[0]?.message);
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const openModal = (id: string) => {
    setEventToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEventToDelete(null);
  };

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "images",
        header: "Thumbnail",
      },
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "category",
        header: "Event Type",
      },
      {
        accessorKey: "date",
        header: "Added Date",
      },
      {
        accessorKey: "price",
        header: "Asking Costs",
      },
      {
        accessorKey: "status",
        header: "Event Status",
      },
    ],
    []
  );

  const table = useReactTable({
    data: events,
    columns: columns as any,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 6,
        pageIndex: 0,
      },
    },
  });

  return (
    <div className="p-4">
      <h1 className="text-indigo-800 text-center text-lg my-5 font-semibold">
        Manage All Events By You
      </h1>

      <div className="w-full mx-auto p-4 border rounded-md shadow-xl mb-6">
        <Input
          placeholder="Filter events by title"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="w-full max-w-md mx-auto"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {table.getRowModel().rows.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No events found.
          </p>
        ) : (
          table.getRowModel().rows.map((row) => {
            const event = row.original as TEvent;
            return (
              <div
                key={row.id}
                className="border rounded-lg shadow-lg p-4 flex flex-col"
              >
                <div className="relative h-48 w-full rounded-md overflow-hidden mb-4">
                  {event.images && event.images[0] ? (
                    <Image
                      src={event.images[0]}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw,
                             (max-width: 1200px) 50vw,
                             33vw"
                    />
                  ) : (
                    <div className="bg-gray-200 flex items-center justify-center h-full w-full text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                <h2 className="text-lg font-semibold capitalize mb-1 truncate">
                  {event.title}
                </h2>
                <h2 className="text-sm my-3 truncate">{event.description}</h2>

                <p className="text-sm text-gray-600 mb-2 capitalize">
                  <strong>Event Type:</strong> {event.category}
                </p>
                <p className="text-sm text-gray-600 mb-2 capitalize">
                  <strong>Location:</strong> {event.location}
                </p>

                <p className="text-sm text-gray-600 mb-2">
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                <p className="text-sm text-gray-600 mb-2">
                  <strong>Approximately Costs:</strong> ${event.price}
                </p>

                <span>
                  <strong className="text-sm text-gray-600">
                    AttendeeCount:{" "}
                  </strong>
                  <span className="text-indigo-600 font-semibold">
                    {""}
                    {event.status === "available"
                      ? 0
                      : event.status === "sold"
                      ? 1
                      : "-"}
                  </span>
                </span>

                <div className="flex justify-between items-center gap-3 my-5">
                  <Link
                    href={`/user/dashboard/events/update-event/${event._id}`}
                    className="text-green-600 hover:text-green-800 flex items-center gap-2"
                    aria-label="Edit Event"
                  >
                    <EditIcon size={20} />
                    Update
                  </Link>

                  <button
                    onClick={() => openModal(event._id)}
                    className="text-red-600 hover:text-red-800 flex items-center gap-2"
                    aria-label="Delete Event"
                  >
                    <FaTrash size={20} /> Delete
                  </button>
                </div>

                <div className="mb-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className={`capitalize w-full ${
                          event.status === "available"
                            ? "bg-green-600 text-white"
                            : event.status === "sold"
                            ? "bg-red-600 text-white"
                            : ""
                        }`}
                      >
                        {event.status === "sold" ? "Unavailable" : event.status}{" "}
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() =>
                          handleUpdateEventStatus(event._id, "available")
                        }
                        className="cursor-pointer text-green-600"
                      >
                        Available
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleUpdateEventStatus(event._id, "sold")
                        }
                        className="cursor-pointer text-red-600"
                      >
                        Unavailable
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="flex justify-center items-center gap-5 my-7">
        <p>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="hover:cursor-pointer border border-neutral-300 px-4 flex py-[6px] gap-3 items-center justify-center font-medium rounded-full transition-all duration-300 ease-in-out hover:bg-indigo-800 hover:text-white bg-indigo-700 text-white"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hover:cursor-pointer border border-neutral-300 px-4 flex py-[6px] gap-3 items-center justify-center font-medium rounded-full transition-all duration-300 ease-in-out hover:bg-indigo-800 hover:text-white bg-indigo-700 text-white"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-20 flex justify-center items-center z-20 transition-opacity duration-300 ease-out">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg transform transition-all duration-300 ease-out opacity-100 translate-y-0">
            <h3 className="text-xl font-semibold">Confirm Deletion</h3>
            <p className="mt-4 text-sm text-gray-700">
              Are you sure you want to delete this event? This action cannot be
              undone.
            </p>
            <div className="mt-6 flex justify-between">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 rounded-md text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (eventToDelete) {
                    handleDeleteEvent(eventToDelete);
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
