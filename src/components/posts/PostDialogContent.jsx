import React, { useState } from "react";
import Cross from "../icons/Cross";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import PostLabel from "./PostLabel";

const PostDialogContent = ({
  closeModal,
  post,
  setPost = () => {},
  handleSave = () => {},
}) => {
  const { title, description, labels } = post;
  const { toast } = useToast();
  function handleChange(e) {
    setPost((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function handleAddLabel(label) {
    if (!label) return;
    if (labels.includes(label)) {
      toast({
        title: `Label named ${label} already present`,
        variant: "destructive",
      });
      return;
    }
    setPost((prev) => {
      return { ...prev, labels: [...prev.labels, label] };
    });
  }

  function handleRemoveLabel(label) {
    setPost((prev) => {
      const newLabels = labels.filter((item) => item !== label);
      return { ...prev, labels: newLabels };
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <Textarea
        id="title"
        name="title"
        autoResizable
        value={title}
        placeholder={"Untitled Post"}
        onChange={handleChange}
        className="text-lg h-[40px] bg-slate-50 focus-visible:ring-0 focus-visible:ring-offset-0 border-none"
        rows={1}
      />
      <Textarea
        id="description"
        name="description"
        autoResizable
        value={description}
        placeholder={"Write something here too..."}
        onChange={handleChange}
        className="bg-slate-50 focus-visible:ring-0 focus-visible:ring-offset-0 border-none"
        rows={3}
      />
      <div className="flex flex-wrap gap-2">
        <PostLabel handleAddLabel={handleAddLabel} />
        <div className="flex flex-wrap gap-2">
          {labels.map((label) => {
            return (
              <Button
                key={label}
                variant="outline"
                size="sm"
                className="text-xs rounded-full py-1 h-fit px-3 my-auto">
                <span className="">{label}</span>
                <Cross
                  width={16}
                  height={16}
                  className="ml-1 min-w-[16px]"
                  onClick={() => {
                    handleRemoveLabel(label);
                  }}
                />
              </Button>
            );
          })}
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <Button
          size="sm"
          variant="secondary"
          className="w-20 "
          onClick={closeModal}>
          Cancel
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className="w-20"
          onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default PostDialogContent;
