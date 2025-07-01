"use client";
import { useState } from "react";
import { TEvent } from "../../../types/event";
import Container from "../../shared/Container";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import EventCard from "./EventCard";
import ProductSkeleton from "../../ui/core/skeleton/ProductSkeleton";

export default function AllEvents({ events }: { events: TEvent[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filtered = events
    ?.filter((item) =>
      [item.title, item.category, item.location].some((f) =>
        f?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .filter((item) =>
      selectedCategory !== "all" ? item.category === selectedCategory : true
    )
    .filter((item) => {
      const eventDate = new Date(item.date).getTime();
      const from = dateFrom ? new Date(dateFrom).getTime() : null;
      const to = dateTo ? new Date(dateTo).getTime() : null;
      if (from && eventDate < from) return false;
      if (to && eventDate > to) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "priceAsc") return a.price - b.price;
      if (sortBy === "priceDesc") return b.price - a.price;
      if (sortBy === "titleAsc") return a.title.localeCompare(b.title);
      if (sortBy === "titleDesc") return b.title.localeCompare(a.title);
      if (sortBy === "dateAsc")
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === "dateDesc")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container>
      {/* Filter Controls */}
      <div className="lg:flex justify-between gap-4 my-6">
        {/* Search Input */}
        <Input
          type="text"
          placeholder="Search title, category, or location"
          className="w-full lg:w-[32%]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Sort Dropdown */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full lg:w-[32%]">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="priceAsc">Costs: Low to High</SelectItem>
            <SelectItem value="priceDesc">Costs: High to Low</SelectItem>
            <SelectItem value="titleAsc">Title: A to Z</SelectItem>
            <SelectItem value="titleDesc">Title: Z to A</SelectItem>
            <SelectItem value="dateAsc">Date: Oldest First</SelectItem>
            <SelectItem value="dateDesc">Date: Newest First</SelectItem>
          </SelectContent>
        </Select>

        {/* Category Filter */}
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full lg:w-[32%]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Event Types</SelectItem>
            {[
              "wedding",
              "birthday",
              "corporate",
              "concert",
              "conference",
              "festival",
              "babyShower",
              "engagement",
              "anniversary",
              "productLaunch",
            ].map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Date Range Filter */}
        <div className="w-full lg:w-[32%] flex gap-2 items-center">
          From:{" "}
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-1/2"
          />
          To:
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-1/2"
          />
        </div>

        {/* Reset Button */}
        <div className="w-full flex justify-end mt-2 lg:mt-0">
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setSortBy("");
              setSelectedCategory("all");
              setDateFrom("");
              setDateTo("");
              setCurrentPage(1);
            }}
            className="cursor-pointer text-indigo-700 border-indigo-700 hover:bg-indigo-700 hover:text-white"
          >
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        {paginated.length === 0
          ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
          : paginated.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-5 mt-12">
        <Button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="rounded-full bg-indigo-700 text-white"
        >
          Previous
        </Button>
        <span className="text-sm font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="rounded-full bg-indigo-700 text-white"
        >
          Next
        </Button>
      </div>
    </Container>
  );
}
