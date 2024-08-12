export default function UserProfile({ params }: any) {
  return (
    <div className="text-7xl font-bold text-blue-500  flex flex-col items-center justify-center min-h-screen py-2">
      <h1>This is Profile Page</h1>
      <hr />
      <p className="text-4xl mt-10 text-black">
        Profile Id: 
        <span className="text-3xl p-2 ml-2 rounded bg-orange-500 text-black">
          {params.id}
        </span>
      </p>
    </div>
  );
}
