import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Authentication/useAxiosSecure";
import useAdmin from "../../Authentication/useAdmin";

const InputField = ({ label, value, onChange, type = "text", placeholder = "", textarea }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    {textarea ? (
      <textarea
        rows={3}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 px-3 py-2 outline-none transition"
      />
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 px-3 py-2 outline-none transition"
      />
    )}
  </div>
);

const Section = ({ title, children, open, setOpen }) => (
  <div className="bg-white/80 backdrop-blur-lg shadow-md rounded-2xl p-5 mb-6 border border-gray-100">
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="w-full flex justify-between items-center text-left"
    >
      <h3 className="text-lg font-semibold text-purple-700">{title}</h3>
      <span className="text-gray-600">{open ? "▲" : "▼"}</span>
    </button>
    {open && <div className="mt-4 space-y-3">{children}</div>}
  </div>
);

const AddUniversity = () => {
  const [axiosSecure] = useAxiosSecure();
  const [isAdmin, isAdminLoading] = useAdmin();
  const navigate = useNavigate();

  const [collegeName, setCollegeName] = useState("");
  const [collegeImage, setCollegeImage] = useState("");
  const [admissionData, setAdmissionData] = useState("");
  const [admissionProcess, setAdmissionProcess] = useState("");
  const [collegeRating, setCollegeRating] = useState("");
  const [numberOfResearch, setNumberOfResearch] = useState("");
  const [researchHistory, setResearchHistory] = useState("");

  const [events, setEvents] = useState([""]);
  const [eventsDetails, setEventsDetails] = useState({});
  const [researchWorks, setResearchWorks] = useState([{ title: "", summary: "" }]);
  const [sports, setSports] = useState([""]);
  const [sportsCategories, setSportsCategories] = useState([
    { category_name: "", team_name: "", captain: "" },
  ]);

  const [openSection, setOpenSection] = useState("basic");
  const [loading, setLoading] = useState(false);

  const handleArrayChange = (setter, arr, idx, val) => {
    const copy = [...arr];
    copy[idx] = val;
    setter(copy);
  };

  const handleRemove = (setter, arr, idx) => {
    const copy = [...arr];
    copy.splice(idx, 1);
    setter(copy);
  };

  const handleAdd = (setter, arr, empty) => setter([...arr, empty]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      college_name: collegeName,
      college_image: collegeImage,
      admission_data: admissionData,
      admission_process: admissionProcess,
      college_rating: Number(collegeRating) || 0,
      number_of_research: Number(numberOfResearch) || 0,
      research_history: researchHistory,
      events: events.filter(Boolean),
      events_details: eventsDetails,
      research_works: researchWorks.filter((r) => r.title || r.summary),
      sports: sports.filter(Boolean),
      sports_categories: sportsCategories.filter(
        (s) => s.category_name || s.team_name || s.captain
      ),
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/admin/university", payload);
      if (res?.data?.success) {
        alert("🎉 University added successfully!");
        navigate("/dashboard");
      } else {
        alert("❌ Failed to add university");
      }
    } catch (err) {
      console.error(err);
      alert("Server error, check console");
    } finally {
      setLoading(false);
    }
  };

  if (isAdminLoading) return <div className="p-6 text-gray-600">Checking admin...</div>;
  if (!isAdmin)
    return <div className="p-6 text-red-500 text-lg font-semibold">🚫 Access denied.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
          🏫 Add New University
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Section
            title="🎓 Basic Information"
            open={openSection === "basic"}
            setOpen={() => setOpenSection(openSection === "basic" ? "" : "basic")}
          >
            <InputField label="College Name" value={collegeName} onChange={setCollegeName} />
            <InputField
              label="College Image URL"
              value={collegeImage}
              onChange={setCollegeImage}
              placeholder="https://example.com/image.jpg"
            />
            <InputField
              label="Admission Data"
              value={admissionData}
              onChange={setAdmissionData}
              placeholder="e.g. September 2025"
            />
            <InputField
              label="Admission Process"
              value={admissionProcess}
              onChange={setAdmissionProcess}
              textarea
            />

            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="College Rating"
                value={collegeRating}
                onChange={setCollegeRating}
                type="number"
              />
              <InputField
                label="Number of Research"
                value={numberOfResearch}
                onChange={setNumberOfResearch}
                type="number"
              />
            </div>

            <InputField
              label="Research History"
              value={researchHistory}
              onChange={setResearchHistory}
              textarea
            />
          </Section>

          {/* Events */}
          <Section
            title="🎉 Events"
            open={openSection === "events"}
            setOpen={() => setOpenSection(openSection === "events" ? "" : "events")}
          >
            {events.map((ev, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={ev}
                  onChange={(e) => handleArrayChange(setEvents, events, i, e.target.value)}
                  className="flex-1 border rounded-lg px-3 "
                  placeholder={`Event ${i + 1}`}
                />
                <button
                  type="button"
                  className="px-3  bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => handleRemove(setEvents, events, i)}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAdd(setEvents, events, "")}
              className="px-4  bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200"
            >
              + Add Event
            </button>

            <label className="block text-sm font-medium mt-4">Events Details (JSON)</label>
            <textarea
              value={JSON.stringify(eventsDetails, null, 2)}
              onChange={(e) => {
                try {
                  setEventsDetails(JSON.parse(e.target.value));
                } catch {}
              }}
              className="w-full border rounded-lg px-3  font-mono text-sm"
              rows={4}
            />
          </Section>

          {/* Research Works */}
          <Section
            title="📚 Research Works"
            open={openSection === "research"}
            setOpen={() => setOpenSection(openSection === "research" ? "" : "research")}
          >
            {researchWorks.map((r, idx) => (
              <div key={idx} className="border rounded-lg p-4 mb-3 bg-gray-50">
                <InputField
                  label="Title"
                  value={r.title}
                  onChange={(val) => {
                    const copy = [...researchWorks];
                    copy[idx].title = val;
                    setResearchWorks(copy);
                  }}
                />
                <InputField
                  label="Summary"
                  value={r.summary}
                  onChange={(val) => {
                    const copy = [...researchWorks];
                    copy[idx].summary = val;
                    setResearchWorks(copy);
                  }}
                  textarea
                />
                <button
                  type="button"
                  className="mt-2 px-3  bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => handleRemove(setResearchWorks, researchWorks, idx)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAdd(setResearchWorks, researchWorks, { title: "", summary: "" })}
              className="px-4  bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200"
            >
              + Add Research Work
            </button>
          </Section>

          {/* Sports */}
          <Section
            title="⚽ Sports & Categories"
            open={openSection === "sports"}
            setOpen={() => setOpenSection(openSection === "sports" ? "" : "sports")}
          >
            {sports.map((s, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={s}
                  onChange={(e) => handleArrayChange(setSports, sports, i, e.target.value)}
                  className="flex-1 border rounded-lg px-3 "
                  placeholder={`Sport ${i + 1}`}
                />
                <button
                  type="button"
                  className="px-3  bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => handleRemove(setSports, sports, i)}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAdd(setSports, sports, "")}
              className="px-4  bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200"
            >
              + Add Sport
            </button>

            <h4 className="mt-4 font-medium text-gray-700">Sports Categories</h4>
            {sportsCategories.map((sc, idx) => (
              <div key={idx} className="border rounded-lg p-4 mb-3 bg-gray-50">
                <InputField
                  label="Category Name"
                  value={sc.category_name}
                  onChange={(val) => {
                    const copy = [...sportsCategories];
                    copy[idx].category_name = val;
                    setSportsCategories(copy);
                  }}
                />
                <InputField
                  label="Team Name"
                  value={sc.team_name}
                  onChange={(val) => {
                    const copy = [...sportsCategories];
                    copy[idx].team_name = val;
                    setSportsCategories(copy);
                  }}
                />
                <InputField
                  label="Captain"
                  value={sc.captain}
                  onChange={(val) => {
                    const copy = [...sportsCategories];
                    copy[idx].captain = val;
                    setSportsCategories(copy);
                  }}
                />
                <button
                  type="button"
                  className="mt-2 px-3  bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => handleRemove(setSportsCategories, sportsCategories, idx)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                handleAdd(setSportsCategories, sportsCategories, {
                  category_name: "",
                  team_name: "",
                  captain: "",
                })
              }
              className="px-4  bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200"
            >
              + Add Category
            </button>
          </Section>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 rounded-lg text-white font-semibold shadow-md transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {loading ? "Saving..." : "Create University"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUniversity;
