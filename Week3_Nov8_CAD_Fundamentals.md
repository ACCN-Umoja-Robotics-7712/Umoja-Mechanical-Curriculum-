# Week 3 (November 8): CAD Fundamentals & Digital Design
**Duration**: 4-5 hours  
**Learning Style**: Interactive CAD instruction, hands-on design practice, collaborative modeling

## Session Overview
Students learn Computer-Aided Design (CAD) software to create professional 3D models and technical drawings. Building on their understanding of simple machines and mechanisms, students will digitally model robot components and assemblies, preparing them for modern engineering workflows.

## Learning Objectives
By the end of Week 3, students will:
- Navigate CAD software interface confidently (SolidWorks/Fusion 360)
- Create detailed 3D models of mechanical parts
- Generate technical drawings with proper dimensions and annotations
- Design assemblies with proper constraints and relationships
- Apply parametric design principles for easy modifications
- Connect CAD models to real-world manufacturing requirements

## Weekly Schedule

### Hour 1: CAD Software Introduction (60 minutes)
**Format**: Guided tutorial with immediate hands-on practice

#### Activities:
1. **CAD in Modern Engineering** (15 min)
   **Why CAD is Essential**:
   - **Visualization**: See designs before building
   - **Analysis**: Test strength, motion, and performance digitally
   - **Communication**: Share precise designs with team members
   - **Manufacturing**: Direct connection to 3D printers, CNC machines
   - **Documentation**: Automatic generation of technical drawings
   - **Iteration**: Rapid design changes and improvements

   **FRC Context**:
   - Most competitive teams use CAD for all robot design
   - CAD models help with packaging and interference checking
   - Required for advanced manufacturing techniques
   - Essential for design documentation and sharing

2. **Software Overview & Interface** (20 min)
   **Primary Software Options**:
   - **SolidWorks**: Industry standard, powerful features, educational licenses available
   - **Fusion 360**: Cloud-based, free for students, integrated manufacturing
   - **OnShape**: Browser-based, excellent collaboration, free for education

   **Interface Tour** (using primary software):
   - **Feature Tree**: History of design operations
   - **Graphics Area**: 3D model display and interaction
   - **Command Manager**: Tools and operations
   - **Property Manager**: Settings for current operation
   - **Status Bar**: Feedback and system information

3. **Basic Navigation & View Controls** (25 min)
   **Essential Skills**:
   - **Rotate**: Click and drag to orbit around model
   - **Pan**: Shift + drag to move view
   - **Zoom**: Scroll wheel or zoom tools
   - **View Orientations**: Standard views (front, top, right, isometric)
   - **Display Modes**: Wireframe, hidden lines, shaded, realistic

   **Hands-on Practice**:
   - Students open sample models and practice navigation
   - Explore different view modes and orientations
   - Understand 3D coordinate system (X, Y, Z axes)
   - Practice selecting edges, faces, and features

**Materials Needed**:
- Computers with CAD software installed
- Sample CAD models for exploration
- Navigation reference guides
- Headphones for individual tutorial videos if needed

### Hour 2: 2D Sketching Fundamentals (60 minutes)
**Format**: Progressive skill building with guided practice

#### Activities:
1. **Sketching Concepts** (20 min)
   **Why Sketching is Foundation**:
   - All 3D features start with 2D sketches
   - Sketches define the profile or path for 3D operations
   - Proper sketching technique ensures predictable results
   - Constraints and dimensions control sketch behavior

   **Sketch Environment**:
   - **Sketch Plane**: 2D workspace within 3D model
   - **Origin**: Reference point for all geometry
   - **Construction Lines**: Reference geometry that doesn't create material
   - **Sketch Relations**: Automatic relationships between sketch elements

2. **Basic Sketch Tools** (25 min)
   **Line Tools**:
   - **Line**: Creates straight line segments
   - **Rectangle**: Creates rectangular profiles
   - **Circle**: Creates circular profiles
   - **Arc**: Creates curved segments

   **Sketch Relations**:
   - **Coincident**: Points touch each other
   - **Parallel**: Lines remain parallel
   - **Perpendicular**: Lines meet at 90 degrees
   - **Equal**: Elements have same size
   - **Symmetric**: Elements mirror each other

   **Hands-on Exercise**: Simple Bracket Sketch
   - Create rectangular outline
   - Add mounting holes with circles
   - Apply appropriate relations and dimensions
   - Experience fully defined vs. under-defined sketches

3. **Dimensioning & Constraints** (15 min)
   **Dimension Types**:
   - **Linear**: Distance between points or edges
   - **Angular**: Angle between lines
   - **Radial**: Radius or diameter of arcs and circles
   - **Driven**: Reference dimensions that don't control geometry

   **Constraint Strategy**:
   - Start with geometric relations
   - Add dimensions to fully define sketch
   - Avoid over-constraining (conflicting requirements)
   - Use construction geometry for reference

**Materials Needed**:
- CAD workstations with tutorial files
- Printed sketching exercises
- Reference sheets for tools and shortcuts
- Simple mechanical parts for sketch practice

### Hour 3: 3D Feature Creation (60 minutes)
**Format**: Feature-based modeling with practical applications

#### Activities:
1. **Basic 3D Features** (30 min)
   **Extrude (Boss/Base)**:
   - Creates 3D geometry by extending 2D sketch
   - **Direction**: Single direction or both directions
   - **Distance**: Specific measurement or "through all"
   - **Draft**: Angled sides for manufacturing considerations

   **Cut (Extruded Cut)**:
   - Removes material using 2D sketch profile
   - Same options as extrude but removes instead of adds
   - Essential for holes, slots, and material removal

   **Revolve**:
   - Creates 3D geometry by rotating 2D sketch around axis
   - Perfect for cylindrical parts (shafts, pulleys, wheels)
   - **Angle**: Full revolution (360°) or partial

   **Hands-on Practice**: Simple Robot Wheel
   - Sketch wheel profile (circle with spoke pattern)
   - Revolve to create 3D wheel
   - Add mounting holes with cuts
   - Experience the relationship between 2D sketch and 3D result

2. **Intermediate Features** (20 min)
   **Fillet**:
   - Rounds sharp edges and corners
   - **Constant Radius**: Same radius along entire edge
   - **Variable Radius**: Different radius at different points
   - **Purpose**: Aesthetics, safety, stress reduction

   **Chamfer**:
   - Creates angled cuts on edges
   - **Distance**: Single distance or two distances
   - **Angle**: Specified angle from surface
   - **Purpose**: Manufacturing ease, part fit-up

   **Pattern Features**:
   - **Linear Pattern**: Repeats features in straight lines
   - **Circular Pattern**: Repeats features around circular axis
   - **Essential for**: Mounting holes, gear teeth, repeated elements

3. **Practice Project: Simple Gearbox Plate** (10 min)
   - Create rectangular base plate (extrude)
   - Add mounting holes (circular pattern of cuts)
   - Add motor mount features (rectangular cuts)
   - Round corners (fillets)
   - Experience complete part creation workflow

**Materials Needed**:
- CAD software with tutorial guidance
- Example parts for reference
- Measuring tools for real-world part verification
- Project instruction sheets

### Hour 4: Assembly Modeling (60 minutes)
**Format**: Multi-part design with relationships and constraints

#### Activities:
1. **Assembly Concepts** (20 min)
   **Why Assemblies Matter**:
   - **Fit Checking**: Ensure parts work together
   - **Motion Studies**: Verify mechanisms operate correctly
   - **Interference Detection**: Find collisions between parts
   - **Complete Visualization**: See entire system together

   **Assembly Structure**:
   - **Components**: Individual parts within assembly
   - **Sub-assemblies**: Groups of parts that function together
   - **Mates**: Relationships that position parts relative to each other
   - **Degrees of Freedom**: Available motion for each component

2. **Mate Types & Applications** (25 min)
   **Basic Mates**:
   - **Coincident**: Surfaces or edges touch
   - **Parallel**: Surfaces remain parallel but can slide
   - **Perpendicular**: Surfaces meet at 90 degrees
   - **Concentric**: Cylindrical surfaces share same centerline

   **Advanced Mates**:
   - **Distance**: Specific gap between surfaces
   - **Angle**: Specific angle between planes
   - **Gear**: Simulates gear interaction with ratios
   - **Mechanical**: Cam, slot, universal joint relationships

   **Hands-on Assembly**: Simple Claw Mechanism
   - Import pre-made claw components
   - Apply mates to position parts correctly
   - Verify mechanism can open and close
   - Check for interferences and clearances

3. **Motion Studies & Analysis** (15 min)
   **Basic Motion**:
   - **Manual Dragging**: Move components to test operation
   - **Animation**: Automatic cycling through motion range
   - **Collision Detection**: Identify interference problems

   **Performance Checking**:
   - **Clearance Analysis**: Minimum gaps between parts
   - **Range of Motion**: Full extent of mechanism travel
   - **Assembly Sequence**: Order of part installation

**Materials Needed**:
- CAD workstations with assembly capabilities
- Pre-created component files for assembly practice
- Assembly instruction guides
- Real mechanism examples for reference

### Hour 5: Technical Drawings & Documentation (45-60 minutes)
**Format**: Professional documentation creation and standards

#### Activities:
1. **Engineering Drawing Fundamentals** (20 min)
   **Purpose of Technical Drawings**:
   - **Manufacturing Instructions**: Tell machinists exactly what to make
   - **Quality Control**: Inspection and verification standards
   - **Communication**: Universal language of engineering
   - **Legal Documentation**: Contractual specifications

   **Drawing Standards**:
   - **ANSI/ASME**: American National Standards Institute standards
   - **ISO**: International Organization for Standardization
   - **Line Types**: Object lines, hidden lines, center lines, dimension lines
   - **Views**: Orthographic projection (front, top, right side)

2. **Creating Technical Drawings** (20 min)
   **Drawing Views**:
   - **Standard Views**: Front, top, right automatically generated from 3D model
   - **Section Views**: Show internal features by "cutting" through part
   - **Detail Views**: Enlarged views of complex areas
   - **Isometric Views**: 3D-looking view for visualization

   **Dimensioning Practice**:
   - **Functional Dimensions**: Critical for part performance
   - **Manufacturing Dimensions**: Required for making the part
   - **Dimension Placement**: Clear, unambiguous positioning
   - **Tolerance Notation**: Acceptable variation from nominal size

   **Hands-on Practice**: Create drawing of previous week's designed part
   - Generate standard orthographic views
   - Add appropriate dimensions
   - Include necessary notes and specifications
   - Format according to standard practices

3. **CAD Documentation Best Practices** (10 min)
   **File Management**:
   - **Naming Conventions**: Systematic, descriptive file names
   - **Version Control**: Track changes and iterations
   - **Backup Systems**: Protect work from loss
   - **Team Sharing**: Collaborative work strategies

   **Model Organization**:
   - **Feature Names**: Descriptive names for design intent
   - **Design Tables**: Parametric variations of parts
   - **Configurations**: Different versions within same file
   - **Custom Properties**: Metadata for part identification

**Materials Needed**:
- CAD software with drawing capabilities
- Drawing standard reference materials
- Printed examples of good technical drawings
- File management system setup

## Assessment
- **CAD Navigation**: Efficient use of software interface and tools
- **Sketching Quality**: Properly constrained and dimensioned 2D sketches
- **3D Modeling**: Accurate creation of mechanical parts using appropriate features
- **Assembly Skills**: Correct mating and positioning of multiple components
- **Documentation**: Professional technical drawings with proper standards

## Preparation for Week 4
- **Practice**: Complete online CAD tutorials for additional skill building
- **Exploration**: Sketch 3 objects from home and consider how to model them in CAD
- **Research**: Find examples of technical drawings online and identify different view types
- **Software**: Ensure CAD software access for continued practice

## Advanced Extensions
- **Parametric Design**: Create parts with design tables for multiple configurations
- **Surface Modeling**: Advanced techniques for complex shapes
- **Simulation**: Basic stress analysis and motion studies
- **Rendering**: Photorealistic visualization of designs

## Materials List
### Computer Requirements
- Computers with dedicated graphics cards
- CAD software licenses (educational versions)
- High-resolution monitors for detailed work
- Reliable internet for cloud-based software

### Reference Materials
- CAD tutorial guides and quick reference cards
- Engineering drawing standards (ANSI Y14.5)
- Example technical drawings from industry
- Measuring tools for verification of real parts

### Practice Components
- Simple mechanical parts for measurement and modeling
- Assembly kits for hands-on mate practice
- Real robot components for reference
- 3D printed examples of student work

## Software Setup Notes
- **SolidWorks**: Requires Windows, significant hard drive space, annual license
- **Fusion 360**: Cross-platform, cloud storage, free educational license
- **OnShape**: Browser-based, no installation required, automatic saves
- **File Formats**: Ensure compatibility between different software choices

## Safety Notes
- **Ergonomics**: Proper workstation setup for extended computer use
- **Eye Strain**: Regular breaks and proper lighting
- **Data Security**: Proper saving and backup procedures
- **Software Licensing**: Understanding educational use restrictions

## Mentor Notes
- **Individual Attention**: CAD learning curves vary significantly between students
- **Practical Connection**: Continuously relate CAD work to physical parts and real applications
- **Incremental Progress**: Build complexity gradually to avoid overwhelming students
- **Portfolio Development**: Document student CAD work for assessment and showcase
- **Industry Context**: Share how CAD is used in professional engineering environments
- **Problem Solving**: Encourage systematic approach to CAD challenges

## Common Challenges & Solutions
- **Software Intimidation**: Start with simple operations and build confidence gradually
- **3D Visualization**: Use physical models to help students understand 3D relationships
- **Feature Failures**: Teach systematic troubleshooting of CAD errors
- **File Management**: Establish clear naming and organization systems from day one
- **Perfectionism**: Emphasize learning process over perfect initial results

## Integration with Previous Weeks
- **Week 1 Design Process**: CAD is Stage 5 of the design process learned earlier
- **Week 2 Simple Machines**: Model the mechanisms analyzed in previous week
- **Upcoming Weeks**: CAD models will guide measurement, manufacturing, and assembly

This week establishes the digital design foundation that will support all subsequent hands-on manufacturing and assembly work, bridging the gap between conceptual design and physical implementation.