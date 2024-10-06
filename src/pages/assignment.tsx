import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { ArrowRightIcon, ClapperboardIcon } from "lucide-react";

export const AssignmentPage: React.FC = () => {
  return (
    <>
      <PageHeader>
        <Link
          className='group inline-flex items-center px-0.5 text-sm font-medium'
          to='/movies'
        >
          <ClapperboardIcon className='h-4 w-4' />{" "}
          <Separator className='mx-2 h-4' orientation='vertical' />{" "}
          <span className='underline-offset-4 group-hover:underline'>
            Take me to the movies
          </span>
          <ArrowRightIcon className='ml-1 h-4 w-4' />
        </Link>
        <PageHeaderHeading className='hidden md:block'>
          Why Popcrown ?
        </PageHeaderHeading>
        <PageHeaderHeading className='md:hidden'>
          Why Popcrown is born ?
        </PageHeaderHeading>

        <PageHeaderDescription>
          The starting point of the site was a task to demonstrate coding
          abilities and has no profit motive. For fun, I deepened the work on
          the site and expanded the task definitions. Below are the original
          definitions of the task. Feel free to check out the GitHub repository
        </PageHeaderDescription>
      </PageHeader>

      {/* Card for General Guidelines */}
      <Card className='my-6'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold'>
            Assignment Description
          </CardTitle>
        </CardHeader>
        <CardContent>
          <section className='mb-8'>
            <h2 className='text-2xl font-semibold mb-4'>General Guidelines</h2>
            <ul className='list-disc pl-5 space-y-2'>
              <li>
                Feel free to use any open-source 3rd party libraries you like.
              </li>
              <li>
                This page must be implemented using <strong>React.js</strong>{" "}
                and TypeScript.
              </li>
              <li>Pay attention to performance and smoothness of the page.</li>
              <li>
                Use correct code architecture, the code should be clean and
                readable.
              </li>
              <li>
                You should be able to explain the division into components and
                other design decisions.
              </li>
              <li>User experience (UX) is up to you.</li>
            </ul>
          </section>

          {/* Submission Instructions */}
          <section className='mb-8'>
            <h2 className='text-2xl font-semibold mb-4'>Submission</h2>
            <p className='text-lg'>
              You can zip and mail the project or upload it to GitHub and
              provide the repository link.
            </p>
          </section>
        </CardContent>
      </Card>

      {/* Card for Assignment Details */}
      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='text-2xl font-semibold'>
            Assignment Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className='list-decimal pl-5 space-y-2'>
            <li>
              The app should display a list of the top 20 most popular movies.
            </li>
            <li>
              Each item in the list should include the movie’s picture, title,
              and release date.
            </li>
            <li>
              Use the <strong>TMDB API</strong> to retrieve movie data.{" "}
              <a
                href='https://developers.themoviedb.org/3/getting-started/introduction'
                target='_blank'
                className='text-blue-500 underline'
              >
                API Documentation
              </a>
              .
            </li>
            <li>
              The link to retrieve the top movies list:{" "}
              <a
                href='https://api.themoviedb.org/3/movie/popular?api_key=4170bf35f7a61b8012d65de6ad644b9b&page=1'
                target='_blank'
                className='text-blue-500 underline'
              >
                Popular Movies API
              </a>
              .
            </li>
            <li>
              Use the following URL format for movie images:{" "}
              <span className='block mt-2 italic'>
                https://image.tmdb.org/t/p/w500/[poster_path]
              </span>
            </li>
          </ol>
        </CardContent>
      </Card>

      {/* Card for Architecture Explanation */}
      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='text-2xl font-semibold'>
            Architecture Explanation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-lg mb-4'>
            The app is structured using React and divided into smaller, reusable
            components for better maintainability and scalability:
          </p>
          <ul className='list-disc pl-5 space-y-2'>
            <li>
              <strong>MovieItem:</strong> Renders the movie's image, title, and
              release date.
            </li>
            <li>
              <strong>MovieList:</strong> Fetches and displays the list of top
              20 movies using the TMDB API.
            </li>
            <li>
              <strong>API Service:</strong> Encapsulates the logic for fetching
              movie data from the TMDB API.
            </li>
          </ul>
        </CardContent>
      </Card>
    </>
  );
};
