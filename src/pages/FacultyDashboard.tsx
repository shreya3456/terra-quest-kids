import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, Users, Gamepad2, ClipboardCheck, Search, 
  Award, BookOpen, Eye, ChevronLeft, ChevronRight,
  GraduationCap, Building2
} from "lucide-react";

interface Student {
  id: number;
  name: string;
  class: string;
  section: string;
  rollNumber: string;
  ecoPoints: number;
  status: "Active" | "Inactive";
}

const FacultyDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  // Mock faculty data
  const facultyData = {
    name: "Dr. Priya Sharma",
    registrationNumber: "FAC2024001",
    department: "Environmental Science",
    totalPointsAwarded: 2450,
  };

  // Mock overview stats
  const overviewStats = {
    totalStudents: 156,
    gamesReviewed: 89,
    pendingReviews: 23,
  };

  // Mock student data
  const students: Student[] = [
    { id: 1, name: "Arjun Singh", class: "8th", section: "A", rollNumber: "2024001", ecoPoints: 450, status: "Active" },
    { id: 2, name: "Priya Kaur", class: "8th", section: "A", rollNumber: "2024002", ecoPoints: 380, status: "Active" },
    { id: 3, name: "Rahul Sharma", class: "7th", section: "B", rollNumber: "2024003", ecoPoints: 520, status: "Active" },
    { id: 4, name: "Simran Gill", class: "9th", section: "A", rollNumber: "2024004", ecoPoints: 290, status: "Inactive" },
    { id: 5, name: "Harpreet Kaur", class: "8th", section: "B", rollNumber: "2024005", ecoPoints: 610, status: "Active" },
    { id: 6, name: "Manpreet Singh", class: "7th", section: "A", rollNumber: "2024006", ecoPoints: 340, status: "Active" },
    { id: 7, name: "Gurpreet Kaur", class: "9th", section: "B", rollNumber: "2024007", ecoPoints: 475, status: "Active" },
    { id: 8, name: "Jasdeep Singh", class: "8th", section: "A", rollNumber: "2024008", ecoPoints: 220, status: "Inactive" },
    { id: 9, name: "Navdeep Kaur", class: "7th", section: "B", rollNumber: "2024009", ecoPoints: 550, status: "Active" },
    { id: 10, name: "Amandeep Singh", class: "9th", section: "A", rollNumber: "2024010", ecoPoints: 410, status: "Active" },
  ];

  // Filter students based on search
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.includes(searchQuery)
  );

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  return (
    <div className="space-y-8 animate-bounce-in">
      {/* Faculty Profile Card */}
      <Card className="bg-gradient-to-r from-eco-blue/10 to-eco-ocean/10 border-eco-blue/30 shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-eco-blue to-eco-ocean flex items-center justify-center text-4xl shadow-lg">
              👨‍🏫
            </div>
            <div className="flex-1 text-center md:text-left space-y-2">
              <h2 className="text-2xl font-bold text-foreground">{facultyData.name}</h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-eco-blue" />
                  <span>{facultyData.registrationNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-eco-blue" />
                  <span>{facultyData.department}</span>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-2xl p-4 shadow-md text-center">
              <Award className="w-8 h-8 text-eco-yellow mx-auto mb-2" />
              <p className="text-2xl font-bold text-eco-green">{facultyData.totalPointsAwarded}</p>
              <p className="text-sm text-muted-foreground">Points Awarded</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-eco-green/10 to-eco-leaf/10 border-eco-green/30 hover:scale-105 transition-transform cursor-pointer">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-eco-green/20 flex items-center justify-center">
              <Users className="w-7 h-7 text-eco-green" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">{overviewStats.totalStudents}</p>
              <p className="text-muted-foreground">Total Students</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-eco-blue/10 to-eco-ocean/10 border-eco-blue/30 hover:scale-105 transition-transform cursor-pointer">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-eco-blue/20 flex items-center justify-center">
              <Gamepad2 className="w-7 h-7 text-eco-blue" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">{overviewStats.gamesReviewed}</p>
              <p className="text-muted-foreground">Games Reviewed</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-eco-yellow/10 to-accent/10 border-eco-yellow/30 hover:scale-105 transition-transform cursor-pointer">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-eco-yellow/20 flex items-center justify-center">
              <ClipboardCheck className="w-7 h-7 text-eco-yellow" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">{overviewStats.pendingReviews}</p>
              <p className="text-muted-foreground">Pending Reviews</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student List */}
      <Card className="shadow-card">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              <BookOpen className="w-6 h-6 text-eco-green" />
              Student List
            </CardTitle>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, class, or roll number..."
                className="pl-10 border-eco-green/30 focus:border-eco-green"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Student Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Class / Section</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Roll Number</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Eco Points</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedStudents.map((student) => (
                  <tr key={student.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-eco-green to-eco-leaf flex items-center justify-center text-lg">
                          {student.name.charAt(0)}
                        </div>
                        <span className="font-medium">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{student.class} - {student.section}</td>
                    <td className="py-3 px-4">{student.rollNumber}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-eco-green">{student.ecoPoints}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={student.status === "Active" ? "default" : "secondary"}
                        className={student.status === "Active" 
                          ? "bg-eco-green/20 text-eco-green border-eco-green/30" 
                          : "bg-muted text-muted-foreground"
                        }
                      >
                        {student.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-eco-blue/30 text-eco-blue hover:bg-eco-blue/10"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Profile
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="border-eco-green/30"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="px-4 py-2 text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="border-eco-green/30"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyDashboard;
