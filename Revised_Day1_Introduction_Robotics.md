# Day 1: Introduction to Robotics & Basic Mechanical Fundamentals
**Duration**: 4-5 hours  
**Learning Style**: Interactive exploration, hands-on discovery, collaborative learning

## Session Overview
Students will be introduced to the fundamental concepts of robotics, understand the design process, and explore simple machines as the building blocks of complex robotic systems. This foundational day sets the stage for all subsequent learning.

## Learning Objectives
By the end of Day 1, students will:
- Understand what constitutes a robot and its basic components
- Apply the 7-stage robot design process
- Identify and explain the six types of simple machines
- Recognize simple machines in FRC robot mechanisms
- Understand basic mechanical advantage concepts
- Work effectively in teams using collaborative problem-solving

## Schedule

### Hour 1: What is a Robot? (60 minutes)
**Format**: Interactive discussion and hands-on exploration

#### Activities:
1. **Robot Definition Workshop** (20 min)
   - **Core Definition**: A robot/machine is hardware or software made to simplify or automate a task
   - Focus on hardware applications for FRC
   - Students brainstorm: "What makes something a robot vs. just a machine?"
   - Discuss automation, sensors, and decision-making capabilities

2. **The 7-Stage Robot Design Process** (25 min)
   Students learn the systematic approach to robot design:
   
   **Stage 1: Ask Questions & Set Goals**
   - What does my robot need to do?
   - What materials do I have or need?
   - How will my robot navigate and interact?
   - Are there predetermined design requirements?
   - What are the time constraints?

   **Stage 2: Brainstorm Designs and Concepts**
   - Create rough sketches of potential solutions
   - Generate as many designs as possible
   - Iterative process of querying and critiquing each possibility

   **Stage 3: Create Basic Layout Drawing**
   - Draw the selected design concept
   - Ensure components are available and affordable
   - Verify efficient and effective performance
   - Plan locations for battery, RoboRIO, radio, motors, sensors

   **Stage 4: Detail Design**
   - Technical document with precise measurements
   - Show robot operation and part interactions
   - Include gears, screws, axles, chains locations
   - Document electronics placement and connections

   **Stage 5: CAD (Computer Aided Design)**
   - Use detail design to create computer model
   - Software options: SolidWorks, AutoCAD, OnShape
   - Ensure proper file formats for manufacturing

   **Stage 6: Construct Prototype**
   - Build and test the robot/part
   - Execute design and test real-world requirements
   - Constantly update and implement improvements

   **Stage 7: Refine Design**
   - Analyze design and operation for deficiencies
   - Optimize performance (e.g., reduce cycle time from 15s to 10s)
   - Determine if changes require code or hardware modifications

3. **Cyclical Process Discussion** (15 min)
   - Emphasize that the process is truly cyclical with multiple iterations
   - Any tweak requires returning to Stage 1 and following through
   - Real-world examples from FRC competitions

**Materials Needed**:
- Design process poster/handout
- Sketching materials
- Examples of FRC robots at different design stages

### Hour 2: Simple Machines - The Building Blocks (60 minutes)
**Format**: Hands-on exploration with physical examples

#### Activities:
1. **Simple Machines Overview** (15 min)
   **Definition**: Simple Machine - any device with few or no moving parts used to modify motion and force needed to do work
   - Multiplies user's little effort to create great effort
   - Uses mechanical advantage (effort multiplier)
   - Complex machines consist of many simple machines combined

2. **The Six Simple Machines** (45 min)
   Students rotate through stations exploring each type:

   **Station 1: Inclined Plane (8 min)**
   - Sloping surface (ramp) used to lift heavy bodies
   - Steeper slope = greater force needed
   - **Physics Explanation**:
     - Flat surface force = mass × gravity (9.8 m/s²)
     - Incline force = Down Force × Sin(angle)
     - Always less force than lifting straight up
   - **Practical Calculation**: 
     - 10kg block on flat = 98N force required
     - Same block on 15° incline = 25.4N force required
   - **FRC Applications**: Pickup ramps, scoring platforms

   **Station 2: Wedge (8 min)**
   - Triangular tool (portable inclined plane)
   - Functions: split, cut, tighten, hold, aerodynamics
   - **Examples**: Axe, knife, door stop, nail
   - **Complex Example**: Zipper mechanism with multiple wedges
   - **FRC Applications**: Intake guides, splitting mechanisms

   **Station 3: Screw (8 min)**
   - Inclined plane wrapped around cylinder
   - **Primary Use**: Hold things together
   - **Types**: Screws alone, bolts with nuts, lifting screws
   - **Example**: Screw jack for lifting heavy objects
   - **FRC Applications**: Assembly fasteners, linear actuators

   **Station 4: Pulley (8 min)**
   - Grooved circular disk guiding rope/cable
   - **Single Pulley**: Changes direction of force
   - **Pulley System**: Changes amount and direction of effort
   - **Examples**: Cranes, bulldozers, elevators
   - **FRC Applications**: Climbing mechanisms, lifting systems

   **Station 5: Wheel and Axle (8 min)**
   - Circular wheel connected to circular shaft
   - Increases rotational force (torque) instead of linear force
   - **Key Concept**: Torque is crucial for gear systems
   - **FRC Applications**: Drive systems, rotating mechanisms

   **Station 6: Lever (5 min)**
   - Long beam resting on fulcrum/pivot point
   - **Principle**: Fulcrum close to load, effort far from fulcrum
   - **Components**: Load (output force), effort (input force)
   - **Example**: Prybar for separating objects
   - **FRC Applications**: Arm mechanisms, lifting systems

**Materials Needed**:
- Physical examples of each simple machine
- Demonstration materials (blocks, ramps, pulleys, etc.)
- Calculators for force calculations
- Measurement tools

### Hour 3: Robotics Mechanisms & Applications (60 minutes)
**Format**: Analysis of real FRC mechanisms using simple machine principles

#### Activities:
1. **Hooks & Climbing Mechanisms** (20 min)
   **Definition**: Mechanisms for grasping objects in a "pulling" manner
   
   **Case Study: AndyMark Climber in a Box**
   - Watch: "Climber in a box (1 Minute)" video
   - **Components**: Hook, two shafts (inner/outer), bearing kit, winch plate, motor, gearbox
   - **Operation**: Two states - deployed (maximum length) and ready (minimum length)
   - **Mechanism**: Constant force spring extends, winch cord retracts
   - **Simple Machine Analysis**: Pulley system (winch) + lever principles

2. **Claws & Grasping Mechanisms** (25 min)
   **Three Types of Claws**:
   
   **Single-Sided Claws**:
   - Fixed structural piece + motorized moving piece
   - Motor/gear system opens and closes
   - Clamps game piece against fixed surface
   - **Simple Machines**: Lever (claw arm) + gear system (wheel and axle)

   **Double-Sided Claws**:
   - Both sides activate simultaneously
   - Even number of gears for coordinated movement
   - First gear connects to one side, last gear to other side
   - **Simple Machines**: Multiple gear systems (wheel and axle)

   **Roller Claws**:
   - Use wheels, intake rollers, or tank treads
   - Spin to pull game pieces in, reverse to push out
   - Can have one fixed side or rollers on both sides
   - Designed to spin faster than robot movement
   - **Simple Machines**: Wheel and axle + friction principles

   **Watch**: "Understanding Claws" video (analyze simple machine components)

3. **Elevators (Linear Slides)** (15 min)
   **Two Categories**: Continuous and Cascading
   
   **Continuous Rigging**:
   - Watch: Continuous elevator video (5 minutes)
   - Simple extension system
   - **Simple Machines**: Pulley systems + inclined plane principles
   
   **Cascade Rigging**:
   - Watch: Cascade elevator video (5 minutes)
   - More complex rigging system
   - Multiple stages move simultaneously at different speeds
   - Second stage moves 2x faster than first, third moves 3x faster
   - **Simple Machines**: Complex pulley systems + mechanical advantage

**Materials Needed**:
- Video playback capability
- Real FRC climbing and claw mechanisms if available
- Sketching materials for mechanism analysis

### Hour 4: Drive Systems Overview (60 minutes)
**Format**: Hands-on exploration of different drive types

#### Activities:
1. **Robot Composition** (10 min)
   **Two Main Parts**:
   - **Base/Drivetrain**: Makes robot move around course
   - **Superstructure**: Completes specific tasks
   
   **Three Main Drive Types**: Tank, Mecanum, Swerve

2. **Tank Drive System** (20 min)
   **Definition**: Method of controlling motors using two controller axes, each operating motors on one side
   
   **Operation**:
   - Driving controlled by wheel groups on each side
   - Variations possible by changing wheels or motor configurations
   - **Simple Machines**: Wheel and axle + leverage principles
   
   **Hands-on Activity**: If available, students test tank drive robot
   - Experience turning, forward/backward movement
   - Understand differential steering concept

3. **Mecanum Drive System** (10 min)
   **Note**: Not primary focus but important to understand
   - Watch: Mecanum drive video
   - Students identify differences from tank drive
   - **Key Feature**: Omnidirectional movement capability
   - **Simple Machines**: Specialized wheel and axle systems

4. **Swerve Drive System** (20 min)
   **Key Feature**: All wheels can move independently
   - Watch: Swerve drive video
   - Much greater maneuverability than tank or mecanum
   - **This Year's Focus**: Will build swerve drive using Thriftybot products
   - Students compare all three systems for advantages/disadvantages
   - **Simple Machines**: Complex wheel and axle + rotational systems

**Materials Needed**:
- Video playback capability
- Drive system examples if available
- Comparison worksheets

### Hour 5: Hands-on Workshop - Fasteners (45-60 minutes)
**Format**: Practical skills workshop

#### Activities:
1. **Understanding Screws and Fasteners** (30 min)
   **Screw Types**:
   - Wood screws
   - Metal screws  
   - Multi-purpose screws
   
   **Size Systems**:
   - Imperial measurements
   - Metric measurements
   
   **Head Types**:
   - Hex, Pan Head, Counter sink, Truss, Socket Cap
   
   **Drive Types** (External/Internal):
   - Robertson, Hex Socket, Hex, Phillips (French Cross)

2. **Practical Fastener Skills** (15 min)
   - **Torque Awareness**: Knowing when screw reaches torque limit
   - **Over-tightening Recognition**: Identifying when screw is too tight
   - **Proper Installation**: Matching fastener to application
   - **Safety Considerations**: Proper tool use and material compatibility

**Materials Needed**:
- Variety of screws and fasteners
- Screwdrivers and hex keys
- Sample materials for practice
- Torque demonstration tools

## Assessment
- **Participation**: Active engagement in discussions and activities
- **Simple Machine Identification**: Ability to identify and explain simple machines in mechanisms
- **Design Process Understanding**: Can explain and apply the 7-stage process
- **Collaboration**: Effective teamwork during hands-on activities
- **Safety Awareness**: Proper handling of tools and materials

## Homework/Preparation for Day 2
- Review the 7-stage design process
- Find examples of simple machines in everyday objects at home
- Think about a simple robot task and how you might approach the design process
- Watch additional FRC mechanism videos if interested

## Advanced Extensions
For students who finish early:
- Calculate mechanical advantage for different simple machine configurations
- Analyze complex FRC mechanisms to identify multiple simple machines
- Research historical development of simple machines
- Design a simple mechanism combining multiple simple machine types

## Materials List
- Physical examples of all six simple machines
- FRC robot examples or photos
- Video playback equipment
- Sketching and calculation materials
- Basic tools for fastener workshop
- Safety equipment

## Safety Notes
- Proper handling of demonstration mechanisms
- Safe use of basic tools during fastener workshop
- Awareness of moving parts in mechanisms
- Proper lifting techniques for heavier demonstration items

## Mentor Notes
- Encourage curiosity and questions throughout
- Connect all concepts to real FRC applications
- Help students see simple machines in complex mechanisms
- Emphasize that engineering builds on basic principles
- Document student insights and "aha moments"
- Prepare for more complex applications in upcoming days

## Common Challenges & Solutions
- **Complexity Overwhelm**: Break down complex mechanisms into simple machine components
- **Physics Intimidation**: Use practical examples before introducing calculations
- **Attention Management**: Keep activities hands-on and interactive
- **Varying Experience Levels**: Pair experienced students with beginners