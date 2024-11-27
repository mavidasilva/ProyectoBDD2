const Team = () => {
  const teamMembers = [
    {
      name: "Leonard Krasner",
      position: "Senior Designer",
      image: "/image1.jpg",
    },
    {
      name: "Floyd Miles",
      position: "Principal Designer",
      image: "/image2.jpg",
    },
    {
      name: "Emily Selman",
      position: "VP, User Experience",
      image: "/image3.jpg",
    },
  ];

  return (
    <section className="bg-gray-100 p-8">
      <h2 className="text-2xl font-bold text-center mb-4">Meet our team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <div className="team-member text-center" key={index}>
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p>{member.position}</p>
            <div className="flex justify-center space-x-2 mt-2">
              <a href="#" className="text-blue-600">
                LinkedIn
              </a>
              <a href="#" className="text-gray-600">
                Twitter
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
