"use client";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import deleteArticle from "@/lib/articles/deleteArticle.action";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeletePostModal = ({ id }: { id: number }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size={"sm"} variant={"destructive"}>
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Article?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this article? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <div className="flex justify-center gap-3">
              <DialogClose className="border text-sm px-3 rounded ">
                Cancel
              </DialogClose>
              <Button
                variant={"destructive"}
                onClick={async (e) => {
                  setError("");
                  try {
                    setIsLoading(true);
                    const res = await deleteArticle(id);
                    if (res && res.error) {
                      console.error(res.error);
                      setError(res.error);
                    } else {
                      router.refresh();
                      setOpen(false);
                    }
                  } catch (e) {
                    console.error(e);
                    setError("Something went wrong, please try again later");
                  } finally {
                    setIsLoading(false);
                  }
                }}
              >
                <Spinner spin={isLoading} />
                <span> Delete </span>
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeletePostModal;
