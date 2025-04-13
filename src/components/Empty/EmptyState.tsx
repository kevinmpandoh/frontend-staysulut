const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className="text-center text-muted-foreground text-sm py-10">
      {message}
    </div>
  );
};

export default EmptyState;
