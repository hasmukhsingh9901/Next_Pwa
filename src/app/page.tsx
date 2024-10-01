"use client";
import { Input, Button, Collapse, Select, Skeleton, Spin } from "antd";
import {
  FilterOutlined,
  DownOutlined,
  UpOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { fetchMovies, Movie } from "@/lib/fetchMovies";
import MovieCard from "@/components/MovieCard";

const { Panel } = Collapse;

const GenreList = () => (
  <Select className="w-full" placeholder="Select Genre">
    <Select.Option value="action">Action</Select.Option>
    <Select.Option value="drama">Drama</Select.Option>
    <Select.Option value="comedy">Comedy</Select.Option>
  </Select>
);

const ReleaseYearSelector = () => (
  <Select className="w-full" placeholder="Select Year">
    <Select.Option value="2023">2023</Select.Option>
    <Select.Option value="2022">2022</Select.Option>
    <Select.Option value="2021">2021</Select.Option>
  </Select>
);

const DurationSelector = () => (
  <Select className="w-full" placeholder="Select Duration">
    <Select.Option value="short">Short</Select.Option>
    <Select.Option value="medium">Medium</Select.Option>
    <Select.Option value="long">Long</Select.Option>
  </Select>
);

const RatingList = () => (
  <Select className="w-full" placeholder="Select Rating">
    <Select.Option value="5">5 stars</Select.Option>
    <Select.Option value="4">4 stars</Select.Option>
    <Select.Option value="3">3 stars</Select.Option>
  </Select>
);



const MovieCardSkeleton = () => <Skeleton active />;

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [movies, setmovies] = React.useState<Movie[]>([])

  const fetchData = async () => {
    setLoading(true)
    const res = await fetchMovies({});
    console.log("Movies",res);
    setmovies(res)
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <header className="pt-12 pb-3">
        <h1 className="font-bold text-3xl text-black">Your search</h1>
      </header>

      <div className="min-h-screen flex flex-col md:flex-row gap-4 md:gap-8 p-4">
        <aside className="w-full md:w-64">
          <Collapse
            defaultActiveKey={["1"]}
            expandIconPosition="right"
            className="bg-white"
          >
            <Panel header="Filter" key="1" extra={<FilterOutlined />}>
              <Collapse>
                <Panel header="Genres" key="2">
                  <GenreList />
                </Panel>
                <Panel header="Release Year" key="3">
                  <ReleaseYearSelector />
                </Panel>
                <Panel header="Duration" key="4">
                  <DurationSelector />
                </Panel>
                <Panel header="Rating" key="5">
                  <RatingList />
                </Panel>
              </Collapse>
            </Panel>
          </Collapse>
        </aside>

        <main className="flex-1">
          <header className="flex w-full gap-x-2">
            <div className="relative flex-1">
              <Input
                prefix={<SearchOutlined />}
                placeholder="Search..."
                className="w-full rounded-lg"
              />
            </div>
            <Button type="primary">Search</Button>
          </header>

          <div className="mt-6 flex flex-col gap-4">
            {/* <MovieCard/> */}
            {movies.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
