import { format } from "date-fns";
import VerticalDots from "../icons/VerticalDots";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import PostForm from "./PostForm";

const PostLists = ({
  isTemp = false,
  loading = false,
  posts = [],
  deletePost = () => {},
}) => {
  if (loading)
    return (
      <div className="flex flex-col gap-4">
        {new Array(2).fill(null).map((_, i) => {
          return <div key={i} className="shimmer w-full h-36" />;
        })}
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      {posts?.length > 0 ? (
        posts.map((post) => {
          const { _id, title, description, isPinned, updatedAt, labels } = post;
          return (
            <div
              key={_id + title + description}
              className="overflow-hidden p-4 flex md:gap-4 gap-2 border border-gray-300 rounded-lg">
              <div className="grow">
                <div className="flex items-center gap-4 text-sm">
                  <span>
                    {format(new Date(updatedAt), "dd MMM, yyyy HH:mm")}
                  </span>
                  {isPinned && (
                    <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-sm ml-[-4px]">
                      Pinned
                    </span>
                  )}
                </div>
                <p className="text-lg font-semibold mb-2 mt-1">{title}</p>
                <p>{description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {labels.map((label) => {
                    return (
                      <p
                        key={label}
                        className="border border-gray-200 rounded-sm bg-gray-200 text-xs px-2">
                        {label}
                      </p>
                    );
                  })}
                </div>
              </div>
              <Popover>
                <PopoverTrigger className="self-start">
                  <div className="p-2 border border-gray-200 hover:bg-gray-100 self-start rounded-md">
                    <VerticalDots height="16" width="16" />
                  </div>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-[100px] p-0">
                  <div className="flex flex-col">
                    <PostForm isTemp={isTemp} editing postToEdit={post} />
                    <Button
                      onClick={() => {
                        deletePost(_id);
                      }}
                      variant="ghost"
                      className="!text-red-500">
                      Delete
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          );
        })
      ) : (
        <p className="mb-10">No Posts present</p>
      )}
    </div>
  );
};

export default PostLists;
